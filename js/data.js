// Data general de Secciones Teóricas Puras
const dataSecciones = [
    {
        id: "fund", 
        title: "🧱 Fundamentos de Nube", 
        intro: "El examen te hará preguntas tramposas mezclando estos términos fundamentales.",
        cards: [
            { badge: "Súper Común", title: "🧽 Elasticidad", desc: "Crecer y ENCOGER recursos en respuesta a la demanda automáticamente (Auto Scaling). <b>Traducción:</b> Ahorra dinero apagando todo cuando nadie lo usa." },
            { title: "📈 Escalabilidad", desc: "Añadir capacidad para manejar alta carga de usuarios. <i>Scale Up</i> (Más memoria RAM) o <i>Scale Out</i> (Comprar más Servidores idénticos unidos)." },
            { title: "✅ Alta Disponibilidad", desc: "Garantizar que el sistema casi nunca se cae o desconecta (99.99%). Se logra obligatoriamente desplegando en múltiples Zonas de Disponibilidad (Multi-AZ)." },
            { title: "⚡ Agilidad", desc: "Libertad y Velocidad IT extrema. Reduce el <i>Time-to-Market</i> de meses a solo minutos." },
            { title: "🧱 Tolerancia a Fallos", desc: "Cero Caídas. Incluso si explota un componente físicamente por un rayo, el sistema global sigue funcionando sin interrumpirse ni un solo segundo." },
            { title: "🛡️ Fiabilidad", desc: "Asegurar que el sistema siga reglas y se recupere súper rápido mitigando cualquier interrupción." }
        ]
    },
    {
        id: "pric", 
        title: "💰 Pricing & Familias EC2", 
        intro: "Aprende qué tipo usar basándote estrictamente en el estado de tu software.",
        cards: [
            { title: "⏱️ On-Demand (Bajo Demanda)", desc: "Pagamos los recursos fijos por cada hora. Eres flexible al 100%. <b>Ideal:</b> Apps impredecibles, experimentos cortos o migraciones nuevas." },
            { title: "🔒 Reserved Instances", desc: "Un acuerdo y compromiso por <b>1 a 3 Años</b>. Te da descuentos masivos imbatibles a la larga. <b>Ideal:</b> 'Cargas Base' o Bases de Datos operativas que siempre están encendidas." },
            { title: "🎯 Spot Instances (Spot)", desc: "Descuento demencial (90%), porque adquieres capacidad SOBRANTE temporal, PERO te la pueden arrebatar repentinamente. <b>Ideal:</b> Procesos Batch de Lote, tolerantes a fallar." },
            { title: "🖥️ Dedicated Hosts", desc: "Alquilar un chasis físico de Hardware interno en exclusiva. <b>Ideal:</b> Regulaciones de gobierno o llevar tus licencias comerciales físicas (BYOL)." }
        ]
    },
    {
        id: "gov", 
        title: "📊 Gobernanza y Billing", 
        cards: [
            { title: "📁 AWS Organizations", desc: "Agrupa múltiples cuentas de la empresa. Permite la crucial <b>Facturación Consolidada (Consolidated Billing)</b> que activa descuentos masivos." },
            { title: "🌆 AWS Control Tower", desc: "Instala y despliega cuentas automáticas hiper-seguras (Landing Zones) en minutos aplicando reglas estrictas por Organizations." },
            { title: "📈 Cost Explorer vs Budgets", desc: "<b>Explorer:</b> Historiador de gráficos que estudia el ayer y pronostica el futuro de tu inversión. <br><b>Budgets:</b> Fija alarmas hoy (Ej: SMS al pasar de $10)." },
            { title: "⚖️ Pricing Calculator", desc: "Arquitecto presupuestal. Lo usas <b>ANTES</b> de crear la nube para simular ('¿Si meto 2 RDS, cuanto cuesta?')." }
        ]
    },
    {
        id: "sec", 
        title: "🛡️ Seguridad Base (Súper Claves)", 
        cards: [
            { badge: "Ataques de Red", title: "🛡️ Shield vs WAF", desc: "<b>Shield:</b> Escudo mágico defensivo frente a DDoS. La versión Standard es gratuita siempre.<br><b>WAF:</b> Portero lógico de capa 7 contra Inyección SQL o malicia XSS." },
            { badge: "Encuentra PII oculta", title: "🔍 Amazon Macie", desc: "El Sabueso con <i>Machine Learning</i> entrenado. Rastrea e inventaría la presencia de Datos de Usuario Clandestinos (PII, tarjetas, reportes médicos) en baldes S3." },
            { badge: "Detective Hacker", title: "🕵️ Amazon GuardDuty", desc: "Vigilante silencioso. Analiza montañas de Logs para avistar hackers, mineros de crypto y comportamientos de red o cuenta anómalos." },
            { badge: "Vulnerabilidades SO", title: "🦠 Amazon Inspector", desc: "Escáner. Se introduce dentro de tus EC2 buscando Vulnerabilidades tipo CVE del Sistema Operativo Windows/Linux o parches que tú olvidaste." },
            { badge: "¿Quién le dio Clic?", title: "⏪ Config vs CloudTrail", desc: "<b>Config:</b> Historiador físico ('Esta EC2 pesaba hoy m2, en la tarde t3').<br><b>CloudTrail:</b> Historiador judicial ('El usuario X invocó este API de borrado el sábado desde Rusia')." },
            { badge: "Cumplimiento Oficial", title: "📜 AWS Artifact", desc: "El portal Boveda. Cuando un legislador gubernamental te obliga a probar que AWS es seguro, descargas de acá el PDF del certificado Oficial SOC, ISO y PCI universal." }
        ]
    },
    {
        id: "db", 
        title: "🗄️ Bases de Datos Principales", 
        cards: [
            { badge: "Base Estructurada Clásica", title: "Amazon RDS & Aurora", desc: "Sql Preaprobado y Multi-AZ.<br>Aurora = Es el poderoso relacional nativo AWS compatible veloz con MySQL." },
            { badge: "Extremo Serverless", title: "Amazon DynamoDB", desc: "NoSQL. Cero parches por servidor base. Latencias al milisegundo a escala exagerada global usando llave-valor." },
            { badge: "Base Temporal rápida", title: "Amazon ElastiCache", desc: "Microsegundo en memoria (Redis/Memcached). Alivia la base de datos principal sacando el peso de miles de lecturas redundantes." },
            { badge: "Analytics Inteligencia", title: "Amazon Redshift", desc: "Data Warehouse. Creado especialmente para masticar petabytes corporativos inmensos de BI (OLAP analytics) sin pestañear." }
        ]
    },
    {
        id: "rar", 
        title: "👽 Servicios \"Raros\" e hiper confundibles", 
        cards: [
            { badge: "Local On-Prem", title: "📦 AWS Outposts", desc: "Hardware Híbrido. AWS envía físicamente un Rack original a ser instalado por un humano operario localmente en el sótano/red on-premise de tu empresa." },
            { title: "🎮 WorkSpaces vs AppStream 2.0", desc: "<b>WorkSpaces (VDI):</b> Un Windows/Linux virtual completo asignado a un trabajador remoto en un PC obsoleto.<br><b>AppStream 2.0:</b> Transmite solo visualmente una app gráfica pesada puntual por navegador, no el Desktop entero." },
            { title: "🔌 Direct Connect vs VPN", desc: "<b>Direct Connect:</b> El cable privado de Fibra Óptica que va desde la nube a tu oficina y evita pasar por Internet nunca. <br><b>VPN:</b> Es saltar por Internet Pública de modo hiper-cifrado (Túnel IPSec)." },
            { title: "☁️ Amazon Connect vs Batch", desc: "<b>Connect:</b> Un Call Center cloud 100% omnicanal y auto atendedor telefónico.<br><b>Batch:</b> Ejecución automática robótica de procesos agrupados de super-computación reclutando cientos de máquinas en lote." }
        ]
    },
    {
        id: "ia", 
        title: "🤖 Inteligencia Artificial", 
        cards: [
            { title: "👁️ Amazon Rekognition", desc: "Extrae los metadatos visuales analizando Fotos y Video para predecir si hay contenido adulto, identificar celebridades o leer textos de imagenes." },
            { title: "🗣️ Polly & 🎤 Transcribe", desc: "<b>Polly (El loro):</b> Entregarle texto para convertir a voz dictada real.<br><b>Transcribe (Transcripción auditiva):</b> Realizarle la inversa, extraer de un audio de Reunión grabada y devolver un texto literal escrito." },
            { title: "🧠 Comprehend & 🤖 Lex", desc: "<b>Comprehend (Sentimiento):</b> NLP. Analizar el sentir masivo humano en texto. (Ej: tweets enojados en soporte técnico al cliente).<br><b>Lex:</b> Un motor que construye Chatbots automatizados conversacionales del mismo modo que opera Amazon Alexa." },
            { title: "👨‍🔬 Amazon SageMaker", desc: "Taller para Data Scientists puristas para fabricar y operar modelos predictivos experimentales gigantes de ML desde la raíz nula." }
        ]
    }
];

// Data estructural HTML puro mezclado
const dataHTMLBlocks = [
    {
        id: "waf",
        title: "🏛️ Well-Architected Framework",
        html: `
        <p>No son reglas de la compañía de tu empleador, son herramientas tácticas de diseño técnico.</p>
        <table>
            <tr><th>Pilar</th><th>En el examen busca palabras como:</th></tr>
            <tr><td><b>1. Excelencia Operativa</b></td><td>Infraestructura como código (IaC), Runbooks, aprender de fallas pasadas sin culpar individuos.</td></tr>
            <tr><td><b>2. Seguridad</b></td><td>Principio de Menor Privilegio constante, Protección y Encriptación integral, Rastreo puro.</td></tr>
            <tr><td><b>3. Fiabilidad</b></td><td>Recuperación automática de desconexiones aisladas, testear la recuperación, escalar horizontal.</td></tr>
            <tr><td><b>4. Ef. de Rendimiento</b></td><td>Elegir la Familia de instancias correcta matemáticamente, migrar al mundo Serverless.</td></tr>
            <tr><td><b>5. Optimización Costos</b></td><td>Aniquilar recursos sin uso huérfanos. Buscar modelos ahorrativos. Pagar el mínimo requerido estricto.</td></tr>
            <tr><td><b>6. Sostenibilidad</b></td><td>Impacto ambiental mitigado globalmente por tus servidores. Consumos limpios.</td></tr>
        </table>
        `
    },
    {
        id: "caf",
        title: "🧠 Cloud Adoption Framework (CAF)",
        html: `
        <div class="al"><b>CAF No es Well-Architected.</b> CAF ayuda a transformar a TODA LA ORGANIZACIÓN completa hacia la cultura de la Nube. Well-Architected optimiza una app aislada separada.</div>
        <div class='grid'>
            <div class='c'><span class='badge'>Perspectiva Negocio</span><h4>🏢 Business</h4>ROI (Retorno sobre inversión) y alianzas con la Estrategia del mercado.</div>
            <div class='c'><span class='badge'>Perspectiva Negocio</span><h4>👥 People</h4>Evaluar roles, Cultura moderna y el <b>Entrenamiento masivo / Certificaciones</b> del Recurso Humano.</div>
            <div class='c'><span class='badge'>Perspectiva Negocio</span><h4>⚖️ Governance</h4>Gobernar la Cartera del Riesgo empresarial general TI.</div>
            <div class='c'><span class='badge'>Técnico</span><h4>🛠️ Platform</h4>Establecer la arquitectura y los fundamentos de viaje migratorio base.</div>
            <div class='c'><span class='badge'>Técnico</span><h4>🔐 Security</h4>Cumplimiento en la Arquitectura de IAM estricta global.</div>
            <div class='c'><span class='trampa-badge'>TRAMPA</span><h4>⚙️ Operations</h4>Resolución rápida del incidente. Aquí ocurren procesos rutinarios como el <b>Patching (Actualización de Seguridad y del SO)</b> de los servidores encendidos periódicos.</div>
        </div>
        `
    },
    {
        id: "sop",
        title: "🎧 Planes de Soporte AWS",
        html: `
        <table>
            <tr><th>Beneficio de Plan</th><th>Basic</th><th>Developer</th><th>Business</th><th>Enterprise</th></tr>
            <tr><td><b>Costo referencial base</b></td><td>$0</td><td>$29 / mes</td><td>$100 / mes</td><td>+$150k / mes</td></tr>
            <tr><td><b>Consultoría Arquitectura</b></td><td>No incluye</td><td>General en días laborales</td><td>Casos puntuales rápidos</td><td>Mentoría extensiva</td></tr>
            <tr><td><b>Trusted Advisor (Checks)</b></td><td>Solo 7 básicos claves</td><td>Solo 7 básicos claves</td><td>Accesibilidad Total (+)</td><td>Accesibilidad Total (+)</td></tr>
            <tr><td><b>Horarios Críticos SLA</b></td><td>Foros, comunidad manual</td><td>Solo Email en días negocio</td><td>24/7. &lt; 1 Hora caído en Prod.</td><td><b>24/7. &lt; 15 Mins caído crt.</b></td></tr>
            <tr><td><b>Soporte Humano Dedicado</b></td><td>No aplica</td><td>Contacto 1-a-1 por Email</td><td><b>Canal de Chat 24/7 (Más económico)</b></td><td><b>TAM</b> (Gerente Cuenta Técnica Personal). Concierge privado.</td></tr>
        </table>
        `
    },
    {
        id: "arq",
        title: "🏗️ Arquitectura Básica & Responsabilidad TRAMPA",
        html: `
        <div class='al'><b>¿Quien parchea software de Windows si es EC2 bruta?</b> TÚ, es Seguridad <b>EN</b> la nube.<br><b>¿Quien parchea la base si usas Amazon RDS?</b> AWS automagicamente, es Seguridad <b>DE</b> la Nube por ser "Servicio 100% Administrado AWS".</div>
        <table>
            <tr><th>Elemento Físico AWS</th><th>¿Por qué deberías usarlo mentalmente?</th></tr>
            <tr><td><b>Region (Región global)</b></td><td>Tus clientes son Argentinos. Eliges la 'Region AWS de Sao Paulo' para evitar que tengan altas demoras de carga o Latencia transoceánica en su internet local al oprimir botones web.</td></tr>
            <tr><td><b>Availability Zone (AZ)</b></td><td>Son conjuntos de Data Centers verdaderamente tangibles y separados por kilómetros contra Terremotos/Inundación. Si tu servidor se incendia e inunda localmente, la AZ clonada gemela en otra colina ni lo notará. (Pilar de <i>Alta Disponibilidad</i>).</td></tr>
            <tr><td><b>Edge Location (CDN Borde)</b></td><td>Pequeñas cajas y antenas mundiales periféricas que guardan tu html y tus videos pesados como una copia global rápida. Sirve al sistema Amazon <i>CloudFront (CDN)</i> evitando viajes a la zona original.</td></tr>
        </table>
        `
    },
    {
        id: "st",
        title: "💾 Redes e Historiamiento Storage AWS",
        html: `
        <table>
            <tr><th>Servicio Físico</th><th>Traducción en la mente rápida (Flash)</th></tr>
            <tr><td><b>Amazon S3 (Objetos)</b></td><td>Para tus fotos de perfil de red social, los Backups semanales que no se tocan o alojar un Landing Page HTML Tonto/Estático inyectado barato infinito a durabilidad inquebrantable mundial del código (11xNueves: 99.999999999%). Si buscas congelarlo para revisiones de años al futuro, usas <i>S3 Glacier Config</i> ahorrando muchísimo más.</td></tr>
            <tr><td><b>Amazon EBS (Bloques SO)</b></td><td>Tu Disco Duro real íntimo que tiene la carpeta Windows y el Boot. <b>Mala trampa:</b> Se le conecta directo e indivisible a <b>UNA ÚNICA instancia EC2 pura exclusiva a la vez</b>, sin su EBS interno la EC2 EC2 es un monitor apagado inútil y si EC2 muere localmente sin que tú guardaras externamente (Instantáneas), podrías perder lo almacenado.</td></tr>
            <tr><td><b>AWS Snowball Edge Familias</b></td><td>Saltarte el internet global asqueroso. Llevar migraciones aterradoras Gigantes (> Petabytes) físicas. Es un cofre blindado inviolable despachado en tu piso, para ser cargado con la Manguera USB gigantesca de tu cuarto servidor e hido de vuelta físicamente presencial de correo DHL al paraíso final.</td></tr>
            <tr><td><b>Amazon EFS vs Amazon Amazon FSx</b></td><td>Archivos compartidos paralelos. EFS sirve interconectado para que cientos de servidores en Amazon y EC2 Linux masivos lean de él en paralelo absoluto a gran concurrencia web. FSx brilla cuando tu base de operación son Redes nativas tipo Microsoft Active Directory Windows exclusivas natas.</td></tr>
        </table>
        `
    }
];

// Cheatsheet (Si ves esto, piensa en esto)
const dataCheatsheet = [
    ["Recibir ataque enorme de denegación masivo bots que satura recursos (DDoS)", "AWS Shield (Escudo)"],
    ["Bloquear Inyección SQL sucia y filtros anti-hackeo de comandos capa 7", "AWS WAF / Firewall"],
    ["Identificar PII/Datos médicos sueltos perdidos dentro de tus depósitos S3 sin usar humanos", "Amazon Macie"],
    ["Auditar llamadas IAM puras de empleados (Quién fue, desde qué país IP, Qué botón usó en consola)", "AWS CloudTrail"],
    ["Servicios centralizados corporativos enormes con Facturación Consolidada multicuentas final", "AWS Organizations"],
    ["Automatización robótica con pre-plantillas JSON/YAML creando infraestructura cruda de código (IaC)", "AWS CloudFormation"],
    ["Recomendaciones de los 5 Pilares Universal que te echa luz a servidores sobrepagados innecesarios", "AWS Trusted Advisor"],
    ["Sistema Métrica de CPU saturada / Logs operacionales estres que lanza notificaciones límite operativas", "Amazon CloudWatch"],
    ["Auditor investigador que evalúa el pasado Configuración antigua y averigua qué modificó un humano errático al servidor", "AWS Config"],
    ["Enrutamiento de Red inteligente por salud local (DNS), y FailOver Inteligente web por servidor derretido", "Amazon Route 53"],
    ["Base de Datos MySQL relacional altanisimamente tolerante propietaria y potenciada en nube directa escalable", "Amazon Aurora (Aws Nativa)"],
    ["Túnel Internet Público cifrado muy barato de enlazar local con Aws Cloud (Vpn de empresas clásicas)", "AWS Managed VPN Cloud IPSEC"],
    ["Migrar Data Centers Gigantes evadiéndote por total completo tu frágil cable Ethernet con valijas inviolables pesadas", "AWS Snowball Edge Físicas"]
];

// Preguntas del Simualdor Intercativo
const dataQuiz = [
    {
        q: "AWS te avisa que una vulnerabilidad afecta gravemente a los routers y switches eléctricos en la capa física general. ¿Qué acción debe hacer inmediatamente el cliente local frente a la responsabilidad compartida Cloud?",
        options: [
            "Deberá apurarse a crear un clúster secundario geográfico manual aislante en Multi-AZ de respaldo para prevenir apagón.",
            "Debe lanzar comandos automáticos o manuales de Parche de Red Router de emergencia en todo AWS Console.",
            "Debe omitir preocupación alguna y cruzarse de brazos ya que la Seguridad 'DE LA NUBE' física y routers recae el 100% vital en responsabilidad de la organización personal en Amazon Web Services (AWS)."
        ],
        answer: 2,
        reason: "El hardware perimetral universal global y sus cables de conectividad central siempre serán responsabilidad inherente del propio AWS, es innegociable en Responsabilidad Compartida."
    },
    {
        q: "Un banco busca auditar anualmente todas y absolutamente cada una de las invocaciones del usuario IAM a las bases de datos de consola. Desean el Log notarial que verifique IP y comando. Usaremos:",
        options: [
            "Amazon CloudWatch Logging de Métricas RAM y CPU.",
            "Amazon CloudTrail (Registros de Llamada a APIs).",
            "AWS Configuración Universal."
        ],
        answer: 1,
        reason: "Mientras Config rastrea qué fue manipulado y modificado por el bot localmente físico, es tu CloudTrail de notario principal central quien estampa su firma notarial identificante cada vez que el API web IAM o humano invoca Amazon Cloud."
    },
    {
        q: "Un proyecto temporal numérico pesado para analizar vacunas se correrá durante 2 mañanas seguidas en lotes intensos paralelos, la data no es estricta y puede interrumpirse por un apagón general de 1 hora sin problemas ni pérdida de capital o base y reanudarse. La adquisición más inteligente monetaria ecónomica EC2 Cloud general será:",
        options: [
            "Las inbatibles AWS Spot Instances extremas sin contrato base.",
            "Dedicated Hosts puros.",
            "Instancia EC2 Contrato Reservado Firme de Un Año."
        ],
        answer: 0,
        reason: "La clave mágica para leer la palabra 'Tolerancia Incondicional por lote de horas' es apuntar al exceso remanante subastado que representa un Spot baratisimo sin comprometerse en los esquemas 1-3 Anuales continuados de las Reserved instances."
    }
];

// Flashcards del Repaso Rápido
const dataFlashcards = [
    {
        q: "Scaling 🆚 Elasticity",
        a: "Escalar es inflar masa global de código para aguantar demanda extrema entrante sin explotar el app. Elasticidad implica inflarse, PERO INMEDIATAMENTE DES-INFLARSE (Menguar su ancho automatizado) liberando las máquinas que sobran a la madrugada de vuelta a Amazon para economizar con facturación real minuciosa base inteligente."
    },
    {
        q: "¿De Quién diablos asume verdaderamente los Parcheos: EC2 cruda pura versus RDS de código AWS Autoadministrado profundo?",
        a: "En la Instancia EC2 cruda de terminal, TÚ eres dueño único del terminal Linux puro y los parches. (Es Seguridad EN Cloud Culpable). Pero en una RDS base de datos lista administrada por Aws abstracta, ellos son quienes perióticamente actualizan y operativizan tus Backups base de parcheo SO oculto base general (Por su rol De Seguridad DE LA Cloud Responsable)."
    },
    {
        q: "Identidad AWS I.A.M fundamental global universal",
        a: "Obedece por innegociabilidad base oficial al 'Principio del Menor Privilegio Absoluto'. (Otorga como administrador humano apenas exactamente justo estricto e ínfimo el mínimo poder minúsculo al rol base útil sin entregar comandos mortales excedentes permitidos)."
    },
    {
        q: "¿Sostenibilidad versus Eficiencia Máxima Del Motor Rendimiento Técnico Well-Architect?",
        a: "Un motor Rindiente buscará utilizar tecnología de punta y la instancia de menor cuelo en RAM veloz base (Lanzando serverless inmedia). Sin embargo, un analista Sostenible sacrificará y meditará base a optimizar y colapsar servidores locales que operan malamente al pobre mínimo del 5%, llenándolos térmicamente al máximo 90% para prevenir prender de más granjas que contaminan inútilmente el mundo físico consumiendo voltajes sin carga térmica base utilizable pesada real base final."
    }
];
