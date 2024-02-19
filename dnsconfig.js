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

function FASTMAIL_MX(d) {
  return [
    MX(d, 10, "in1-smtp.messagingengine.com."),
    MX(d, 20, "in2-smtp.messagingengine.com."),
  ]
}

function FASTMAIL_DKIM(d) {
  return [
    CNAME("fm1._domainkey", "fm1." + d + ".dkim.fmhosted.com."),
    CNAME("fm2._domainkey", "fm2." + d + ".dkim.fmhosted.com."),
    CNAME("fm3._domainkey", "fm3." + d + ".dkim.fmhosted.com."),
    CNAME("mesmtp._domainkey", "mesmtp." + d + ".dkim.fmhosted.com.")
  ]
}

var WWW = [
  A("@", "65.21.247.109"),
  A("WWW", "65.21.247.109"),
  AAAA("@", "2a01:4f9:c010:7469::1"),
  AAAA("WWW", "2a01:4f9:c010:7469::1"),
]

var DMARC = DMARC_BUILDER({
  policy: "none",
  rua: [
    "mailto:dmarc-reports@letnh.com"
  ],
  ruf: [
    "mailto:dmarc-reports@letnh.com"
  ]
})

DEFAULTS(DefaultTTL("30m"), NAMESERVER_TTL("30m"))

D("letnh.com", REG_NONE, DnsProvider(DSP_HETZNER),
  SPF,
  DMARC,
  WWW,
  TXT("letnh.dev._report._dmarc", "v=DMARC1;"),
  TXT("hamsterapps.net._report._dmarc", "v=DMARC1;"),
  TXT("nerdyhamster.net._report._dmarc", "v=DMARC1;"),
  A("api", "65.21.247.109"),
  AAAA("api", "2a01:4f9:c010:7469::1"),
  A("wiki", "65.21.247.109"),
  AAAA("wiki", "2a01:4f9:c010:7469::1"),
  A("blog", "65.21.247.109"),
  AAAA("blog", "2a01:4f9:c010:7469::1"),
  FASTMAIL_MX("@"),
  FASTMAIL_MX("*"),
  FASTMAIL_DKIM("letnh.com")
);

D("hamsterapps.net", REG_NONE, DnsProvider(DSP_HETZNER),
  SPF,
  DMARC,
  FASTMAIL_MX("@"),
  FASTMAIL_MX("*"),
  FASTMAIL_DKIM("hamsterapps.net")
);

D("letnh.dev", REG_NONE, DnsProvider(DSP_HETZNER),
  WWW,
  A("api", "65.21.247.109"),
  AAAA("api", "2a01:4f9:c010:7469::1"),
  A("wiki", "65.21.247.109"),
  AAAA("wiki", "2a01:4f9:c010:7469::1"),
  A("blog", "65.21.247.109"),
  AAAA("blog", "2a01:4f9:c010:7469::1"),
  A("dashboard", "65.21.247.109"),
  AAAA("dashboard", "2a01:4f9:c010:7469::1")
);

D("letnh.xyz", REG_NONE, DnsProvider(DSP_HETZNER),
  SPF,
  DMARC,
  FASTMAIL_MX("@"),
  FASTMAIL_MX("*"),
  FASTMAIL_DKIM("letnh.xyz")
);

D("nerdyhamster.net", REG_NONE, DnsProvider(DSP_HETZNER),
  SPF,
  DMARC,
  FASTMAIL_MX("@"),
  FASTMAIL_MX("*"),
  FASTMAIL_DKIM("nerdyhamster.net")
);
