var REG_NONE = NewRegistrar("none");
var DSP_HETZNER = NewDnsProvider("hetzner");

D("letnh.com", REG_NONE, DnsProvider(DSP_HETZNER),
    A("@", "1.2.3.4")
);
