#!/usr/bin/perl
use strict;
use warnings;
use IO::Socket::INET;

my $port = $ENV{PORT} // 3457;
my $root = do { require File::Basename; File::Basename::dirname(__FILE__) };

my %mime = (
    html => 'text/html; charset=utf-8',
    css  => 'text/css; charset=utf-8',
    js   => 'application/javascript; charset=utf-8',
    ico  => 'image/x-icon',
    png  => 'image/png',
    svg  => 'image/svg+xml',
    json => 'application/json; charset=utf-8',
    webmanifest => 'application/manifest+json; charset=utf-8',
);

my $server = IO::Socket::INET->new(
    LocalPort => $port,
    LocalAddr => '0.0.0.0',
    Proto     => 'tcp',
    Listen    => 128,
    ReuseAddr => 1,
) or die "Cannot bind to port $port: $!\n";

print "Italian Learning App running at http://localhost:$port/\n";
$| = 1;

while (1) {
    my $client = $server->accept or next;

    my $pid = fork();
    if (!defined $pid) { close($client); next; }
    if ($pid) { close($client); while (waitpid(-1, 1) > 0) {} next; }

    my $request = '';
    while (my $line = <$client>) {
        $request .= $line;
        last if $line =~ /^\r?\n$/;
    }

    my ($method, $path) = $request =~ /^(GET|HEAD) ([^\s]+)/;
    $path //= '/';
    $path = '/index.html' if $path eq '/' || $path eq '';
    $path =~ s/\?.*//;
    $path =~ s|^/||;
    $path =~ s|\.\.||g;

    my $file = "$root/$path";

    if (-f $file) {
        my ($ext) = $file =~ /\.(\w+)$/;
        my $type = $mime{lc($ext // '')} // 'text/plain; charset=utf-8';
        open(my $fh, '<:raw', $file) or do {
            print $client "HTTP/1.0 500 Error\r\nContent-Length: 5\r\n\r\nError";
            close($client); exit 0;
        };
        local $/; my $body = <$fh>; close($fh);
        print $client "HTTP/1.0 200 OK\r\nContent-Type: $type\r\nContent-Length: " . length($body) . "\r\n\r\n";
        print $client $body unless ($method // '') eq 'HEAD';
    } else {
        my $body = "404 Not Found: /$path";
        print $client "HTTP/1.0 404 Not Found\r\nContent-Type: text/plain\r\nContent-Length: " . length($body) . "\r\n\r\n$body";
    }

    close($client);
    exit 0;
}
