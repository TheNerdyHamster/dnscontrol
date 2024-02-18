var REG_NONE = NewRegistrar("none", {
  no_ns: "true",
});
var DSP_HETZNER = NewDnsProvider("hetzner");

DEFAULTS(DefaultTTL("1h"), NAMESERVER_TTL("30m"))

D("letnh.com", REG_NONE, DnsProvider(DSP_HETZNER),
  A("@", "1.1.1.1")
);

D("hamsterapps.net", REG_NONE, DnsProvider(DSP_HETZNER)
);

D("letnh.dev", REG_NONE, DnsProvider(DSP_HETZNER)
);

D("letnh.xyz", REG_NONE, DnsProvider(DSP_HETZNER)
);

D("nerdyhamster.net", REG_NONE, DnsProvider(DSP_HETZNER)
);
