var REG_NONE = NewRegistrar("none", {
  no_ns: "true",
});
var DSP_HETZNER = NewDnsProvider("hetzner");

var SPF = SPF_BUILDER({
  label: "@",
  overflow: "_spf%d",
  raw: "_rawspf",
  ttl: "10m",
  parts: [
    "v=spf1",
    "include:spf.messagingengine.com",
    "-all"
  ]
});

DEFAULTS(DefaultTTL("1h"), NAMESERVER_TTL("30m"))

D("letnh.com", REG_NONE, DnsProvider(DSP_HETZNER),
  SPF
);

D("hamsterapps.net", REG_NONE, DnsProvider(DSP_HETZNER),
  SPF
);

D("letnh.dev", REG_NONE, DnsProvider(DSP_HETZNER)
);

D("letnh.xyz", REG_NONE, DnsProvider(DSP_HETZNER),
  SPF
);

D("nerdyhamster.net", REG_NONE, DnsProvider(DSP_HETZNER),
  SPF
);
