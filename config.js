// 参考：https://github.com/abrclano/Meandering.Path

// 国内DNS服务器
const domesticNameservers = [
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query" // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query" // Mullvad(备)
];
// DNS配置
const dnsConfig = {
  "dns": true,
  "listen": 1053,
  "ipv6": false,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
     "+.lan",
     "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com",
    
    "stun.*.*.*",
    "stun.*.*",
    "miwifi.com",
    "music.163.com",
    "*.music.163.com",
    "*.126.net",
    "api-jooxtt.sanook.com",
    "api.joox.com",
    "joox.com",
    "y.qq.com",
    "*.y.qq.com",
    "streamoc.music.tc.qq.com",
    "mobileoc.music.tc.qq.com",
    "isure.stream.qqmusic.qq.com",
    "dl.stream.qqmusic.qq.com",
    "aqqmusic.tc.qq.com",
    "amobile.music.tc.qq.com",
    "*.xiami.com",
    "*.music.migu.cn",
    "music.migu.cn",
    "netis.cc",
    "router.asus.com",
    "repeater.asus.com",
    "routerlogin.com",
    "routerlogin.net",
    "tendawifi.com",
    "tendawifi.net",
    "tplinklogin.net",
    "tplinkwifi.net",
    "tplinkrepeater.net",
    "*.ntp.org.cn",
    "*.openwrt.pool.ntp.org",
    "*.*.*.srv.nintendo.net",
    "*.*.stun.playstation.net",
    "xbox.*.*.microsoft.com",
    "*.ipv6.microsoft.com",
    "*.*.xboxlive.com",
    "speedtest.cros.wr.pvp.net"
  ],
  "default-nameserver": ["223.5.5.5", "1.1.1.1", "8.8.8.8"],
  "nameserver": [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "RULE-SET:zjuip,zjuscholar,zju": ["10.10.0.21", "10.10.2.21", ...domesticNameservers],
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
  }
};
// 代理集合通用配置
const proxyProviderCommon = {
  "type": "http",
  "interval": 3600,
  "health-check": {
    "enable": true,
    "url": "https://www.gstatic.com/generate_204",
    "interval": 300
  }
}
// 代理集合配置
const proxyProviders = {
  // "CF-WARP": {...proxyProviderCommon,"url": "https://subs.zeabur.app/clash"},
  "juzi": {...proxyProviderCommon,"url": "https://sub.5112233.xyz/auto"},
  // "bocchi": {...proxyProviderCommon,"url": "https://links.bocchi2b.top/clash"},
  // "chromego": {...proxyProviderCommon,"url": "https://chromego-sub.netlify.app/sub/merged_proxies_new.yaml"}
}
// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};
// 规则集配置
const ruleProviders = {
  "reject": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt"},
  // "icloud": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt"},
  "apple": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt"},
  // "google": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt"},
  "proxy": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt"},
  "direct": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt"},
  "private": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt"},
  "gfw": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt"},
  "tld-not-cn": {...ruleProviderCommon,"behavior": "domain","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt"},
  "telegramcidr": {...ruleProviderCommon,"behavior": "ipcidr","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt"},
  "cncidr": {...ruleProviderCommon,"behavior": "ipcidr","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt"},
  "lancidr": {...ruleProviderCommon,"behavior": "ipcidr","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt"},
  "applications": {...ruleProviderCommon,"behavior": "classical","url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt"},
  // 自用规则
  "zju": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/ZJU.yaml"},
  "zjuip": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/ZJUIPCIDR.yaml"},
  "zjuscholar": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/ZJUScholar.yaml"},
  "myrules": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/MyRules.yaml"},
  "myproxy": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/proxy.yaml"},
  "download": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/download.yaml"},
  "download-sp": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/download-sp.yaml"},
  "steamCN": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/Clash/Providers/Ruleset/SteamCN.yaml"},
  "OPENAI": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/Clash/Providers/Ruleset/OpenAi.yaml"},
  "tiktok": {...ruleProviderCommon,"behavior": "classical","url": "https://raw.githubusercontent.com/onayaaa/RULES/master/Clash/Providers/Ruleset/TikTok.yaml"},
  
};

// 规则
const rules = [
  // 自定义规则
  "RULE-SET,zju,Direct",
  "RULE-SET,zjuscholar,Direct",
  "RULE-SET,zjuip,Direct",
  // 下载
  "RULE-SET,download-sp,Direct",
  "RULE-SET,download,FREE",
  "RULE-SET,steamCN,Direct",
  "RULE-SET,myrules,Direct",
  "RULE-SET,myproxy,Proxy",
  "RULE-SET,OPENAI,US",
  "RULE-SET,tiktok,Proxy",
  "GEOSITE,Category-games@cn,Direct",
  "GEOSITE,Microsoft@cn,Direct",
  "AND,(AND,(DST-PORT,443),(NETWORK,UDP)),(NOT,((GEOIP,CN,no-resolve))),REJECT",// quic
  "DOMAIN-SUFFIX,googleapis.cn,Proxy", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,Proxy", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,Proxy", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,Proxy", // Github Pages
  "DOMAIN,v2rayse.com,Proxy", // V2rayse节点工具
  // Loyalsoldier 规则集
  "RULE-SET,reject,Adblock",
  // "RULE-SET,icloud,Direct",
  "RULE-SET,apple,Direct",
  //"RULE-SET,google,Google",
  "RULE-SET,proxy,Proxy",
  "RULE-SET,gfw,Proxy",
  "RULE-SET,tld-not-cn,Proxy",
  "RULE-SET,applications,Direct",
  "RULE-SET,private,Direct",
  "RULE-SET,direct,Direct",
  "RULE-SET,lancidr,Direct,no-resolve",
  "RULE-SET,cncidr,Direct,no-resolve",
  "RULE-SET,telegramcidr,Proxy,no-resolve",
  // 其他规则
  "GEOIP,LAN,Direct,no-resolve",
  "GEOIP,CN,Direct,no-resolve",
  "MATCH,Global"
];

// 正则筛选节点
function getProxiesByRegex(config, regex) {
  return config.proxies
    .filter((e) => regex.test(e.name))
    .map((e) => e.name);
}

// 创建代理组
function createProxyGroup(name, type, proxies, additionalOptions = {}) { 
  return {
    name,
    type,
    proxies: proxies.length > 0 ? proxies : ["DIRECT"],
    "interval": 300,
    "timeout": 3000,
    "url": "https://www.google.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false,
    ...additionalOptions
  };
}

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount = typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  config.dns = dnsConfig;
  config["proxy-providers"] = proxyProviders;

  // 提取区域正则表达式和对应名称
  const regions = [ 
    { name: "JP", regex: /(日本|JP|Japan|🇯🇵)(?!.*[^\.][2-9](\.[0-9])?x)/ },
    { name: "HK", regex: /(香港|HK|Hong|🇭🇰)(?!.*[^\.][2-9](\.[0-9])?x)/ },
    { name: "US", regex: /(美国|US|United States|America|🇺🇸)(?!.*[^\.][2-9](\.[0-9])?x)/ },
    { name: "SG", regex: /(新加坡|狮城|SG|Singapore|🇸🇬)(?!.*[^\.][2-9](\.[0-9])?x)/ },
    { name: "TW", regex: /(台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼)(?!.*[^\.][2-9](\.[0-9])?x)/ },
    { name: "Others", regex: /^(?!.*(?:香港|HK|Hong|🇭🇰|台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼|新加坡|SG|Singapore|狮城|🇸🇬|日本|JP|Japan|🇯🇵|美国|US|States|America|🇺🇸|[^\.][2-9](\.[0-9])?x)).*$/ },
    { name: "All", regex: /^(?!.*(?:自动|故障|流量|官网|套餐|机场|订阅|年|月|失联|频道|重置|[^\.][2-9](\.[0-9])?x)).*$/ }
  ];

  // 动态生成代理组
  const proxyGroups = regions.map(region => createProxyGroup(region.name, "url-test", getProxiesByRegex(config, region.regex)));

  config["proxy-groups"] = [
    createProxyGroup("Proxy", "select", ["Select", "Auto", "Fallback", "Balance(consistent-hashing)", "Balance(round-robin)",  "JP", "HK","US", "SG", "TW", "Others"]),
    createProxyGroup("Select", "select", getProxiesByRegex(config, regions.find(region => region.name === "All").regex)),
    ...proxyGroups, 
    createProxyGroup("Auto", "url-test", getProxiesByRegex(config, regions.find(region => region.name === "All").regex), { tolerance: 100 }),
    createProxyGroup("Fallback", "fallback", getProxiesByRegex(config, regions.find(region => region.name === "All").regex)),
    createProxyGroup("Balance(consistent-hashing)", "load-balance", getProxiesByRegex(config, regions.find(region => region.name === "All").regex) , { strategy: "consistent-hashing"}),
    createProxyGroup("Balance(round-robin)", "load-balance", getProxiesByRegex(config, regions.find(region => region.name === "All").regex), { strategy: "round-robin"}),
    createProxyGroup("Adblock", "select", ["REJECT","DIRECT", "Proxy"]),
    createProxyGroup("Direct", "select", ["DIRECT", "Proxy"]),
    createProxyGroup("Reject", "select", ["REJECT", "DIRECT", "Proxy"]),
    createProxyGroup("Global", "select", ["Proxy", "DIRECT"]),
    createProxyGroup("FREE", "url-test", [], { "include-all-providers": true , "exclude-filter": "DIRECT", "hidden": true}),
    // createProxyGroup("WARP", "url-test", [], { "use":  ["CF-WARP"], "exclude-filter": "DIRECT" }),
    // createProxyGroup("FREE", "url-test", [], { "use":  ["juzi"], "exclude-filter": "DIRECT" })
  ];

  config["rule-providers"] = ruleProviders;
  config.rules = rules;

  // 返回修改后的配置
  return config;
}

