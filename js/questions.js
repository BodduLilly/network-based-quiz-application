/**
 * NetQuiz – Computer Networks Quiz Application
 * Questions Database (6 Categories x 10 Questions = 60 Questions)
 * Tailored for Computer Networks Project-Based Learning (PBL)
 */

const QUIZ_CATEGORIES = [
  {
    id: 1,
    slug: "osi-tcpip",
    title: "OSI and TCP/IP Models",
    description: "Layer architectures, protocol data units (PDUs), encapsulation, and layer responsibilities.",
    icon: "layers",
    badge: "Architecture",
    color: "#2563eb",
    totalQuestions: 10
  },
  {
    id: 2,
    slug: "ip-subnetting",
    title: "IP Addressing and Subnetting",
    description: "IPv4 & IPv6 classes, CIDR notation, subnet masks, network vs host IDs, and broadcast addresses.",
    icon: "binary",
    badge: "Addressing",
    color: "#0891b2",
    totalQuestions: 10
  },
  {
    id: 3,
    slug: "tcp-udp-protocols",
    title: "TCP, UDP and Networking Protocols",
    description: "Transport layer handshakes, flow control, sliding window, ports, and connectionless vs reliable delivery.",
    icon: "cpu",
    badge: "Transport",
    color: "#4f46e5",
    totalQuestions: 10
  },
  {
    id: 4,
    slug: "devices-topologies",
    title: "Network Devices and Topologies",
    description: "Hubs, switches, routers, gateways, star/mesh/bus physical structures, and collision/broadcast domains.",
    icon: "network",
    badge: "Hardware",
    color: "#0d9488",
    totalQuestions: 10
  },
  {
    id: 5,
    slug: "routing-switching-dns",
    title: "Routing, Switching and DNS",
    description: "MAC learning, VLANs, distance-vector vs link-state routing (RIP/OSPF/BGP), and hierarchical domain lookup.",
    icon: "globe",
    badge: "Routing",
    color: "#1d4ed8",
    totalQuestions: 10
  },
  {
    id: 6,
    slug: "http-security",
    title: "HTTP, HTTPS and Network Security",
    description: "Request methods, status codes, TLS/SSL handshake, symmetric/asymmetric encryption, firewalls, and MITM attacks.",
    icon: "shield-check",
    badge: "Application & Security",
    color: "#0284c7",
    totalQuestions: 10
  }
];

const QUIZ_QUESTIONS = {
  1: [
    {
      id: 101,
      question: "Which layer of the OSI model is responsible for end-to-end communication, error recovery, and flow control?",
      options: ["Network Layer", "Transport Layer", "Data Link Layer", "Session Layer"],
      correct: 1,
      concept: "OSI Layer 4 (Transport)",
      explanation: "The Transport Layer (Layer 4) provides transparent transfer of data between end users, providing reliable data transfer services including flow control, segmentation, and error control (e.g., TCP)."
    },
    {
      id: 102,
      question: "What is the Protocol Data Unit (PDU) called at the Network Layer of the OSI reference model?",
      options: ["Segment", "Frame", "Packet", "Bit stream"],
      correct: 2,
      concept: "PDU Hierarchy",
      explanation: "At the Physical layer it is 'Bits', Data Link is 'Frames', Network is 'Packets', Transport is 'Segments' (or Datagrams for UDP), and Application/Presentation/Session is 'Data'."
    },
    {
      id: 103,
      question: "How many layers are defined in the standard TCP/IP original DoD model compared to the 7 layers of OSI?",
      options: ["3 layers", "4 layers", "5 layers", "6 layers"],
      correct: 1,
      concept: "TCP/IP vs OSI",
      explanation: "The original TCP/IP DoD architectural model defines 4 layers: Application, Transport (Host-to-Host), Internet, and Network Access (Link)."
    },
    {
      id: 104,
      question: "Data encryption, compression, and syntax formatting are handled by which OSI layer?",
      options: ["Session Layer", "Presentation Layer", "Application Layer", "Data Link Layer"],
      correct: 1,
      concept: "Presentation Layer (Layer 6)",
      explanation: "The Presentation Layer transforms data into a format that the application layer can accept, handling serialization, character code conversion (e.g., ASCII/EBCDIC), and encryption/decryption."
    },
    {
      id: 105,
      question: "Which layer in the OSI model is responsible for node-to-node (hop-by-hop) delivery and framing using MAC addresses?",
      options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"],
      correct: 1,
      concept: "Data Link Layer (Layer 2)",
      explanation: "The Data Link Layer is divided into LLC and MAC sublayers. It handles framing, physical MAC addressing, and hop-by-hop delivery across a single physical segment."
    },
    {
      id: 106,
      question: "What process occurs when a higher-layer protocol wraps its header and payload inside a lower-layer protocol?",
      options: ["De-multiplexing", "Encapsulation", "Attenuation", "Decryption"],
      correct: 1,
      concept: "Protocol Encapsulation",
      explanation: "Encapsulation is the process where each layer adds its own header (and sometimes trailer) to the data received from the layer above before passing it down."
    },
    {
      id: 107,
      question: "Which OSI layer establishes, manages, and terminates dialogues between local and remote applications?",
      options: ["Transport Layer", "Session Layer", "Application Layer", "Network Layer"],
      correct: 1,
      concept: "Session Layer (Layer 5)",
      explanation: "The Session Layer establishes, coordinates, and terminates communication sessions (full-duplex or half-duplex) between cooperating applications."
    },
    {
      id: 108,
      question: "Which of the following operates primarily at the Physical layer (Layer 1)?",
      options: ["Ethernet Hub and Repeater", "Layer 2 Switch", "IP Router", "Proxy Firewall"],
      correct: 0,
      concept: "Physical Layer Devices",
      explanation: "Hubs and repeaters work at Layer 1 because they regenerate and broadcast raw electrical/optical bit signals without interpreting MAC or IP addresses."
    },
    {
      id: 109,
      question: "In the TCP/IP model, which layer corresponds to the combined OSI Application, Presentation, and Session layers?",
      options: ["Host-to-Host Layer", "Application Layer", "Internet Layer", "Network Interface Layer"],
      correct: 1,
      concept: "TCP/IP Application Layer",
      explanation: "In TCP/IP, the single Application Layer encompasses all application protocols, data formatting, encryption, and session control."
    },
    {
      id: 110,
      question: "Logical IP addressing and route determination are the core functions of which OSI layer?",
      options: ["Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)", "Layer 7 (Application)"],
      correct: 1,
      concept: "Network Layer (Layer 3)",
      explanation: "Layer 3 assigns logical addresses (IPv4/IPv6) and uses routing protocols to determine best paths for packet transmission across multiple networks."
    }
  ],

  2: [
    {
      id: 201,
      question: "What is the default subnet mask for a standard Class B IPv4 network?",
      options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.240"],
      correct: 1,
      concept: "IPv4 Classful Addressing",
      explanation: "Class B networks use the first 16 bits for the network ID, giving a default subnet mask of 255.255.0.0 (/16). Class A is /8 (255.0.0.0) and Class C is /24 (255.255.255.0)."
    },
    {
      id: 202,
      question: "Given the subnet 192.168.1.0/26, how many usable host IP addresses are available on this subnet?",
      options: ["64", "62", "30", "126"],
      correct: 1,
      concept: "Subnet Host Calculation",
      explanation: "With /26, host bits = 32 - 26 = 6. Total addresses = 2^6 = 64. Usable host addresses = 2^6 - 2 = 62 (reserving the network ID 192.168.1.0 and broadcast ID 192.168.1.63)."
    },
    {
      id: 203,
      question: "Which of the following IP addresses falls within the Private IPv4 address space defined by RFC 1918?",
      options: ["172.33.10.5", "192.169.1.1", "10.150.22.4", "169.254.1.1"],
      correct: 2,
      concept: "RFC 1918 Private Ranges",
      explanation: "RFC 1918 specifies private ranges: 10.0.0.0/8, 172.16.0.0/12 (172.16 to 172.31), and 192.168.0.0/16. Therefore, 10.150.22.4 is private. 169.254.x.x is APIPA."
    },
    {
      id: 204,
      question: "What is the broadcast address for the subnet 172.16.10.0/24?",
      options: ["172.16.10.0", "172.16.10.1", "172.16.10.255", "172.16.255.255"],
      correct: 2,
      concept: "Broadcast Address",
      explanation: "In a /24 subnet, all 8 host bits set to binary 1s yields .255. Thus the direct broadcast address is 172.16.10.255."
    },
    {
      id: 205,
      question: "How many bits are used in an IPv6 address compared to an IPv4 address?",
      options: ["32 bits vs 16 bits", "64 bits vs 32 bits", "128 bits vs 32 bits", "256 bits vs 64 bits"],
      correct: 2,
      concept: "IPv6 vs IPv4 Bit Length",
      explanation: "IPv4 uses 32-bit addresses (~4.3 billion addresses), while IPv6 uses 128-bit hexadecimal addresses (~3.4 x 10^38 addresses) to solve address exhaustion."
    },
    {
      id: 206,
      question: "What is the CIDR prefix for a subnet mask of 255.255.255.192?",
      options: ["/25", "/26", "/27", "/28"],
      correct: 1,
      concept: "CIDR Notation",
      explanation: "255.255.255.192 in binary is 11111111.11111111.11111111.11000000, which has 8 + 8 + 8 + 2 = 26 contiguous ones, represented as /26."
    },
    {
      id: 207,
      question: "What is the loopback IPv4 address used by a host to send network traffic to itself for testing?",
      options: ["0.0.0.0", "127.0.0.1", "255.255.255.255", "192.168.0.1"],
      correct: 1,
      concept: "Loopback Interface",
      explanation: "127.0.0.1 (part of the 127.0.0.0/8 block) is designated for the local loopback interface (localhost) for local testing without external packet transmission."
    },
    {
      id: 208,
      question: "If an organization needs 5 subnets with at least 25 hosts per subnet, what subnet mask should be applied to a 192.168.1.0/24 network?",
      options: ["255.255.255.128 (/25)", "255.255.255.224 (/27)", "255.255.255.240 (/28)", "255.255.255.248 (/29)"],
      correct: 1,
      concept: "Subnet Design",
      explanation: "Borrowing 3 bits from /24 gives /27 (2^3 = 8 subnets >= 5). Remaining host bits = 5, yielding 2^5 - 2 = 30 usable hosts (>= 25). The mask is 255.255.255.224."
    },
    {
      id: 209,
      question: "Which mechanism allows multiple private IP devices on a LAN to share a single public IP address using port numbers?",
      options: ["DNS", "DHCP", "NAT / PAT (Port Address Translation)", "ARP"],
      correct: 2,
      concept: "NAT/PAT",
      explanation: "PAT (Network Address Translation Overload) translates private IP addresses and source port numbers to a single public IP address with unique tracking port numbers."
    },
    {
      id: 210,
      question: "What protocol is used by an IPv4 host to resolve an IP address into a physical Layer 2 MAC address?",
      options: ["ICMP", "ARP (Address Resolution Protocol)", "DNS", "RARP"],
      correct: 1,
      concept: "Address Resolution Protocol (ARP)",
      explanation: "ARP broadcasts a request ('Who has IP X.X.X.X? Tell me your MAC') to map a known Layer 3 IP address to an unknown Layer 2 physical MAC address on the local network."
    }
  ],

  3: [
    {
      id: 301,
      question: "Which sequence correctly represents the TCP Three-Way Handshake used to establish a connection?",
      options: [
        "SYN -> ACK -> SYN-ACK",
        "SYN -> SYN-ACK -> ACK",
        "ACK -> SYN -> ACK-SYN",
        "FIN -> ACK -> FIN-ACK"
      ],
      correct: 1,
      concept: "TCP 3-Way Handshake",
      explanation: "The client sends a SYN packet with initial sequence number (ISN). The server responds with SYN-ACK confirming receipt. Finally, the client sends ACK to finalize connection establishment."
    },
    {
      id: 302,
      question: "Which transport protocol is connectionless, does not guarantee delivery, and has minimal header overhead (8 bytes)?",
      options: ["TCP", "UDP", "SCTP", "RSVP"],
      correct: 1,
      concept: "UDP Protocol",
      explanation: "User Datagram Protocol (UDP) is connectionless, lightweight (8-byte header vs TCP's 20-60 bytes), and best suited for real-time streaming, VoIP, and DNS lookups."
    },
    {
      id: 303,
      question: "What is the primary purpose of TCP Windowing (Sliding Window)?",
      options: [
        "Encrypting transport payloads",
        "Flow control to prevent overwhelming the receiver's buffer",
        "Assigning IP addresses dynamically",
        "Resolving domain names into IP addresses"
      ],
      correct: 1,
      concept: "Flow Control & Windowing",
      explanation: "TCP Sliding Window allows the sender to transmit a specified volume of bytes before requiring an ACK, adjusting dynamically to the receiver's available buffer capacity."
    },
    {
      id: 304,
      question: "What flag in the TCP header is used to gracefully terminate an active connection?",
      options: ["RST (Reset)", "URG (Urgent)", "FIN (Finish)", "PSH (Push)"],
      correct: 2,
      concept: "TCP Connection Teardown",
      explanation: "The FIN flag signals that the sender has no more data to transmit. A graceful teardown typically uses a 4-step exchange (FIN, ACK, FIN, ACK)."
    },
    {
      id: 305,
      question: "What well-known port is standard for HTTPS (secure HTTP) communication?",
      options: ["Port 80", "Port 22", "Port 443", "Port 8080"],
      correct: 2,
      concept: "Well-Known Port Numbers",
      explanation: "HTTPS runs on TCP port 443 by default. Port 80 is HTTP, Port 22 is SSH/SFTP, and Port 53 is DNS."
    },
    {
      id: 306,
      question: "Which TCP congestion control mechanism doubles the congestion window (CWND) every round-trip time until a threshold is reached?",
      options: ["Slow Start", "Congestion Avoidance", "Fast Recovery", "Flow Policing"],
      correct: 0,
      concept: "TCP Slow Start",
      explanation: "During Slow Start, CWND starts at a small value (e.g., 1-10 MSS) and increases exponentially (doubles each RTT) until it reaches the slow-start threshold (ssthresh)."
    },
    {
      id: 307,
      question: "What type of port number range is designated for dynamically allocated client sockets (Ephemeral ports)?",
      options: ["0 - 1023", "1024 - 49151", "49152 - 65535", "65536 - 100000"],
      correct: 2,
      concept: "Port Categories (IANA)",
      explanation: "Ports 0-1023 are Well-Known (System) ports; 1024-49151 are Registered ports; 49152-65535 are Dynamic/Private/Ephemeral ports assigned temporarily by client operating systems."
    },
    {
      id: 308,
      question: "If a TCP sender does not receive an acknowledgment for a packet before the retransmission timer expires, what action is taken?",
      options: [
        "The connection is permanently terminated",
        "The packet is retransmitted and CWND is reduced",
        "The packet is skipped and the next one is sent",
        "UDP fallback is immediately triggered"
      ],
      correct: 1,
      concept: "TCP Reliability & Retransmission",
      explanation: "A timeout (RTO expiration) implies packet loss or network congestion. TCP retransmits the unacknowledged segment and scales down its congestion window to prevent network collapse."
    },
    {
      id: 309,
      question: "Which protocol operates over UDP on port 67 (server) and port 68 (client) to assign network parameters automatically?",
      options: ["DNS", "DHCP (Dynamic Host Configuration Protocol)", "SNMP", "NTP"],
      correct: 1,
      concept: "DHCP Protocol",
      explanation: "DHCP uses the DORA process (Discover, Offer, Request, Acknowledge) over UDP ports 67/68 to lease IP addresses, default gateways, and DNS servers to client machines."
    },
    {
      id: 310,
      question: "What is the purpose of the Checksum field in both TCP and UDP headers?",
      options: [
        "To verify sender identity using public keys",
        "To detect bit errors in the header and data payload",
        "To specify the transmission speed in Megabits",
        "To store the hop count"
      ],
      correct: 1,
      concept: "Error Detection Checksum",
      explanation: "The checksum computes a 16-bit one's complement sum of the pseudo-header, header, and data. If the calculated checksum at the receiver does not match, the packet is discarded."
    }
  ],

  4: [
    {
      id: 401,
      question: "How does a Layer 2 Network Switch differ from a legacy Network Hub?",
      options: [
        "A switch broadcasts incoming frames to all ports indiscriminately",
        "A switch creates separate collision domains for each connected port",
        "A hub maintains a MAC address forwarding table",
        "A switch only works with coaxial cabling"
      ],
      correct: 1,
      concept: "Switch vs Hub",
      explanation: "A switch learns MAC addresses and directs frames only to the designated destination port, isolating collision domains. A hub acts as a multi-port repeater sharing one collision domain."
    },
    {
      id: 402,
      question: "In which network topology is every node connected to every other node, providing maximum redundancy and fault tolerance?",
      options: ["Star topology", "Ring topology", "Mesh topology (Full Mesh)", "Bus topology"],
      correct: 2,
      concept: "Network Topologies",
      explanation: "In a Full Mesh topology, with 'n' nodes there are n(n-1)/2 physical connections. If any single link fails, alternative paths are readily available."
    },
    {
      id: 403,
      question: "Which device is required to interconnect two different IP networks and forward packets based on logical IP addresses?",
      options: ["Repeater", "Bridge", "Router", "Unmanaged Switch"],
      correct: 2,
      concept: "Network Router (Layer 3)",
      explanation: "A Router functions at Layer 3 (Network Layer). It reads destination IP addresses, looks up its routing table, and forwards packets across distinct subnets or autonomous systems."
    },
    {
      id: 404,
      question: "What is a 'Collision Domain' in Ethernet networking?",
      options: [
        "A group of computers that receive the same broadcast message",
        "A network segment where simultaneous transmissions cause data packet collisions",
        "A firewall zone blocking malicious packets",
        "A collection of DNS root servers"
      ],
      correct: 1,
      concept: "Collision Domain",
      explanation: "A collision domain is a physical network segment where data packets can collide with one another when sent simultaneously in half-duplex mode. Switches break up collision domains."
    },
    {
      id: 405,
      question: "Which network device breaks up BOTH collision domains and broadcast domains by default?",
      options: ["Repeater", "Hub", "Layer 2 Switch", "Router"],
      correct: 3,
      concept: "Broadcast & Collision Boundaries",
      explanation: "Routers do not forward Layer 2 or Layer 3 broadcast packets by default. Thus, routers break up both collision domains and broadcast domains."
    },
    {
      id: 406,
      question: "In a Star topology, what is the major single point of failure?",
      options: [
        "The terminator resistor",
        "The central switch or concentrator hub",
        "Any individual client workstation cable",
        "The gateway modem"
      ],
      correct: 1,
      concept: "Star Topology Characteristics",
      explanation: "In a star topology, all end devices connect to a central node. If that central switch or hub goes down, the entire network loses connectivity, though individual cable failures only isolate single devices."
    },
    {
      id: 407,
      question: "What is the primary role of a Modem (Modulator-Demodulator)?",
      options: [
        "To assign DHCP addresses to local devices",
        "To convert digital signals from a computer into analog signals suitable for transmission media and vice versa",
        "To protect against DDoS attacks using deep packet inspection",
        "To calculate optimal OSPF link costs"
      ],
      correct: 1,
      concept: "Modem Functionality",
      explanation: "Modems modulate digital data from computers into analog frequency signals for transmission over analog lines (cable/telephone/fiber carrier) and demodulate received analog signals back to digital."
    },
    {
      id: 408,
      question: "Which protocol is executed on Layer 2 switches to prevent bridge loops and broadcast storms in redundant network designs?",
      options: ["OSPF", "STP (Spanning Tree Protocol - IEEE 802.1D)", "BGP", "ICMP"],
      correct: 1,
      concept: "Spanning Tree Protocol (STP)",
      explanation: "STP prevents Layer 2 switching loops by placing redundant ports into a blocking state while maintaining a loop-free logical active tree topology. If an active link fails, STP recalculates."
    },
    {
      id: 409,
      question: "Which transmission medium provides the highest bandwidth and complete immunity to electromagnetic interference (EMI)?",
      options: ["Unshielded Twisted Pair (UTP Cat 6)", "Coaxial RG-6 Cable", "Fiber Optic Cable", "Shielded Twisted Pair (STP)"],
      correct: 2,
      concept: "Physical Media (Fiber Optics)",
      explanation: "Fiber optic cables transmit data as pulses of light through silica glass or plastic cores, making them completely impervious to electrical noise and capable of gigabit/terabit speeds over long distances."
    },
    {
      id: 410,
      question: "What is an Access Point (AP) in IEEE 802.11 wireless networking?",
      options: [
        "A device that acts as a central wireless transceiver bridging Wi-Fi clients to a wired Ethernet LAN",
        "A software firewall running on Linux servers",
        "A hardware dongle for serial communication",
        "A satellite ground station"
      ],
      correct: 0,
      concept: "Wireless Access Point",
      explanation: "A Wireless Access Point (WAP) broadcasts radio SSIDs and converts 802.11 wireless frames into 802.3 wired Ethernet frames to connect mobile devices to the LAN infrastructure."
    }
  ],

  5: [
    {
      id: 501,
      question: "What does the Domain Name System (DNS) primarily do in computer networks?",
      options: [
        "Translates human-readable domain names (e.g. google.com) into numerical IP addresses",
        "Allocates private IP addresses to local hosts dynamically",
        "Encases Layer 2 frames in GRE tunnels",
        "Compresses image assets across HTTP connections"
      ],
      correct: 0,
      concept: "DNS Resolution",
      explanation: "DNS is a distributed hierarchical database that resolves human-friendly hostnames (like example.edu) into IP addresses (like 93.184.216.34) required by network routing protocols."
    },
    {
      id: 502,
      question: "Which routing algorithm is used by OSPF (Open Shortest Path First)?",
      options: [
        "Bellman-Ford Distance Vector algorithm",
        "Dijkstra's Link-State Shortest Path First (SPF) algorithm",
        "Floyd-Warshall all-pairs algorithm",
        "Round-Robin queueing"
      ],
      correct: 1,
      concept: "OSPF Link-State Routing",
      explanation: "OSPF is an Interior Gateway Protocol (IGP) that builds a complete topological map of the network and runs Dijkstra's algorithm to compute the shortest loop-free path to every destination."
    },
    {
      id: 503,
      question: "What is the maximum hop count allowed by the legacy RIP (Routing Information Protocol) before a destination is considered unreachable?",
      options: ["10 hops", "15 hops (16 is unreachable)", "255 hops", "Unlimited"],
      correct: 1,
      concept: "Distance Vector & RIP Hop Count",
      explanation: "RIP uses hop count as its sole metric. It allows a maximum of 15 hops; a hop count of 16 represents infinity (unreachable), preventing infinite loops in small networks."
    },
    {
      id: 504,
      question: "What technology allows network administrators to logically segment a single physical switch into multiple isolated broadcast domains?",
      options: ["NAT", "VLAN (Virtual Local Area Network - IEEE 802.1Q)", "VPN", "PPPoE"],
      correct: 1,
      concept: "Virtual LAN (VLAN)",
      explanation: "VLANs logically divide physical switch ports into distinct broadcast domains. Traffic between different VLANs must pass through a Layer 3 routing device or inter-VLAN switch."
    },
    {
      id: 505,
      question: "Which protocol is the standard Exterior Gateway Protocol (EGP) used to route traffic across Autonomous Systems on the global Internet?",
      options: ["RIPv2", "EIGRP", "BGP (Border Gateway Protocol)", "IS-IS"],
      correct: 2,
      concept: "Border Gateway Protocol (BGP)",
      explanation: "BGP (specifically BGP-4) is the path-vector protocol that manages routing decisions between independent Autonomous Systems (AS) that comprise the Internet backbone."
    },
    {
      id: 506,
      question: "What DNS record type maps a domain name directly to an IPv4 address?",
      options: ["AAAA record", "A record", "CNAME record", "MX record"],
      correct: 1,
      concept: "DNS Record Types",
      explanation: "An 'A' record maps a hostname to a 32-bit IPv4 address. 'AAAA' maps to a 128-bit IPv6 address, 'CNAME' creates a canonical alias, and 'MX' specifies mail exchange servers."
    },
    {
      id: 507,
      question: "How does a network switch populate its MAC address table (CAM table)?",
      options: [
        "By broadcasting ARP requests every 5 seconds",
        "By inspecting the source MAC address of incoming frames on each physical port",
        "By querying the default gateway router",
        "By reading the destination IP in the packet header"
      ],
      correct: 1,
      concept: "Switch Learning Process",
      explanation: "Switches dynamically learn by reading the SOURCE MAC address of every arriving frame and associating that MAC address with the switch port on which it arrived."
    },
    {
      id: 508,
      question: "What happens when a switch receives a frame whose destination MAC address is NOT present in its MAC table?",
      options: [
        "The switch drops the frame immediately",
        "The switch floods the frame out of all ports except the port on which it was received (Unknown Unicast Flooding)",
        "The switch sends an ICMP destination unreachable message",
        "The switch shuts down the receiving port"
      ],
      correct: 1,
      concept: "Unknown Unicast Flooding",
      explanation: "If a switch does not yet have an entry for the destination MAC, it floods the frame out of all ports on the same VLAN except the ingress port, ensuring the target device receives it."
    },
    {
      id: 509,
      question: "What is the primary role of the Default Gateway configured on a host computer?",
      options: [
        "It provides DNS domain suffix names",
        "It is the IP address of the local router interface that forwards packets destined for remote networks",
        "It handles MAC address assignments for LAN adapters",
        "It runs the host web browser"
      ],
      correct: 1,
      concept: "Default Gateway Role",
      explanation: "When a host determines that a destination IP is outside its own local subnet, it encapsulates the packet in a frame addressed to the Layer 2 MAC address of the Default Gateway router."
    },
    {
      id: 510,
      question: "Which command-line utility uses ICMP Echo Request and Echo Reply messages to test IP reachability and measure round-trip time (RTT)?",
      options: ["netstat", "traceroute", "ping", "nslookup"],
      correct: 2,
      concept: "Ping & ICMP Diagnostics",
      explanation: "The 'ping' tool sends ICMP Echo Request packets (Type 8) to a remote host and waits for ICMP Echo Reply packets (Type 0), displaying round-trip delay and packet loss rate."
    }
  ],

  6: [
    {
      id: 601,
      question: "Which HTTP request method is designed to be idempotent and is primarily used to retrieve data without altering server state?",
      options: ["POST", "GET", "PATCH", "CONNECT"],
      correct: 1,
      concept: "HTTP GET Method",
      explanation: "HTTP GET is a safe, idempotent method intended solely for retrieving resources from a web server without modifying server-side data or creating side effects."
    },
    {
      id: 602,
      question: "What does an HTTP 404 status code indicate to the client browser?",
      options: [
        "OK: The request succeeded",
        "Unauthorized: Authentication credentials required",
        "Not Found: The server cannot locate the requested resource URI",
        "Internal Server Error: The server encountered a bug"
      ],
      correct: 2,
      concept: "HTTP Status Codes (4xx)",
      explanation: "HTTP status code 404 (Not Found) indicates that the server could not locate a resource matching the request URI. 200 is OK, 401 is Unauthorized, and 500 is Internal Server Error."
    },
    {
      id: 603,
      question: "What security protocol does HTTPS use over TCP port 443 to encrypt HTTP communication?",
      options: ["WPA3", "TLS (Transport Layer Security) / SSL", "IPsec only", "Kerberos"],
      correct: 1,
      concept: "TLS/HTTPS Encryption",
      explanation: "HTTPS (Hypertext Transfer Protocol Secure) encapsulates standard HTTP data inside a TLS (formerly SSL) encrypted tunnel, providing confidentiality, integrity, and server authentication."
    },
    {
      id: 604,
      question: "Which type of encryption uses a public key for encryption and a distinct private key for decryption?",
      options: ["Symmetric Encryption (AES/DES)", "Asymmetric / Public-Key Encryption (RSA/ECC)", "Hashing (SHA-256)", "Base64 Encoding"],
      correct: 1,
      concept: "Asymmetric Cryptography",
      explanation: "Asymmetric encryption employs mathematically linked key pairs: a public key shared openly to encrypt messages or verify signatures, and a secret private key retained by the owner."
    },
    {
      id: 605,
      question: "What is the primary role of a Network Firewall?",
      options: [
        "To convert IPv4 packets into IPv6 packets",
        "To monitor, filter, and control incoming and outgoing network traffic based on predetermined security rules",
        "To speed up physical signal transmission through fiber optic repeaters",
        "To assign static IP addresses"
      ],
      correct: 1,
      concept: "Firewall Architecture",
      explanation: "Firewalls establish a barrier between trusted internal networks and untrusted external networks (such as the Internet), inspecting packets by IP, port, protocol, and state."
    },
    {
      id: 606,
      question: "In a Man-in-the-Middle (MITM) attack on an unencrypted HTTP connection, what can an attacker on the same Wi-Fi network achieve?",
      options: [
        "Only view the IP address of the router",
        "Intercept, eavesdrop on, and alter cleartext data such as passwords and session cookies",
        "Permanently rewrite the server's BIOS",
        "Speed up the download bandwidth"
      ],
      correct: 1,
      concept: "Man-in-the-Middle Vulnerability",
      explanation: "Unencrypted HTTP transmits headers, cookies, and payloads in cleartext. An attacker using ARP spoofing or rogue Wi-Fi can view and modify packets in transit, which HTTPS prevents via TLS encryption."
    },
    {
      id: 607,
      question: "What is the purpose of an X.509 Digital Certificate installed on an HTTPS web server?",
      options: [
        "To verify the server's public key and domain identity via a trusted Certificate Authority (CA)",
        "To act as a license for running Apache or Nginx",
        "To store website cookies permanently",
        "To compress HTML markup"
      ],
      correct: 0,
      concept: "Digital Certificates & PKI",
      explanation: "A digital certificate binds a domain name and public key to an organization, cryptographically signed by a reputable Certificate Authority (CA) to thwart domain spoofing."
    },
    {
      id: 608,
      question: "What does the HTTP 301 status code indicate?",
      options: [
        "Bad Request",
        "Moved Permanently (URL redirection)",
        "Service Unavailable",
        "Payment Required"
      ],
      correct: 1,
      concept: "HTTP Redirection (3xx)",
      explanation: "HTTP 301 Moved Permanently signals that the target resource has been permanently assigned a new URI and future references should use one of the returned URIs."
    },
    {
      id: 609,
      question: "Which cryptographic algorithm is a one-way mathematical function used to verify data integrity without allowing decryption?",
      options: ["AES-256", "RSA", "Cryptographic Hash Function (e.g., SHA-256)", "Diffie-Hellman"],
      correct: 2,
      concept: "Hashing & Data Integrity",
      explanation: "Cryptographic hash functions (like SHA-256) generate a fixed-length fingerprint from arbitrary input data. They are one-way (irreversible) and used to verify that data has not been tampered with."
    },
    {
      id: 610,
      question: "What type of attack floods a network server with an overwhelming volume of spurious traffic or half-open TCP connections (SYN Flood)?",
      options: [
        "Denial of Service (DoS / DDoS)",
        "SQL Injection",
        "Cross-Site Scripting (XSS)",
        "Phishing"
      ],
      correct: 0,
      concept: "DoS / SYN Flood Attack",
      explanation: "Denial-of-Service (DoS) and Distributed DoS (DDoS) attacks aim to exhaust server resources (CPU, RAM, or connection state tables) so legitimate users cannot access the service."
    }
  ]
};

// Export to window object for standalone browser script loading
if (typeof window !== "undefined") {
  window.QUIZ_CATEGORIES = QUIZ_CATEGORIES;
  window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
}

// Module export for Node.js / bundling environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUIZ_CATEGORIES, QUIZ_QUESTIONS };
}
