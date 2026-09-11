/* SST — Geography: Contemporary India II (jess1), all 7 chapters. Keys: sst-1-x. */
import type { ChapterDetail } from "./types";

export const SST_GEOGRAPHY: Record<string, ChapterDetail> = {

"sst-1-0": {
  slides: [
    { kicker: "Geography Ch.1", title: "Resources and Development",
      points: ["Resource = anything in the environment that can satisfy human needs (must be technologically accessible, culturally acceptable)", "Classification: biotic/abiotic • renewable/non-renewable • stock/reserve • potential/actual", "Renewable can also fail if overused — groundwater is renewable but finite per year"], formula: "Resource = utility + technology + culture" },
    { kicker: "History", title: "Development of Resources — the Crisis",
      points: ["Problems: depletion, accumulation in few hands, environmental degradation", "1987 Brundtland Commission: 'Sustainable development — development without compromising future generations'", "1992 Rio Earth Summit: Agenda 21 — 180 countries signed the blueprint for the 21st century"], formula: "Sustainable = present + future both win" },
    { kicker: "Land", title: "Land Use and Degradation",
      points: ["India's forest cover is far below the 33% ideal; land degradation: overgrazing, mining, over-irrigation (salinity in Punjab/Rajasthan)", "Zoning: forests, barren, non-agri uses, culturable waste, fallow, net sown area", "Soil is living skin of the earth — erosion by water (gullies in the Chambal ravines) and wind"], formula: "Degradation = overuse without renewal" },
    { kicker: "Soil", title: "Six Major Soil Types",
      points: ["Alluvial (Northern plains): most fertile — khadar (new) vs bhangar (old, kankar)", "Black/regur (Deccan trap): cotton soil, holds moisture, self-ploughing; red (iron oxide, needs fertiliser)", "Laterite (leached by rain — cashew, tea in hills); arid (desert, high salt); forest/mountain soils"], formula: "Alluvial = food • Black = cotton • Laterite = cashew" },
  ],
  mindmap: { central: "Resources",
    branches: [
      { label: "Types", color: "#1a73e8", children: ["Biotic vs abiotic", "Renewable vs stock", "Reserve vs potential", "Individual/community/national"] },
      { label: "Planning", color: "#e37400", children: ["Brundtland 1987", "Rio 1992, Agenda 21", "Sustainable development"] },
      { label: "Land", color: "#146c2e", children: ["Land-use pattern", "Degradation causes", "Over-irrigation → salinity"] },
      { label: "Soil & erosion", color: "#c5221f", children: ["Alluvial, black, red", "Laterite, arid, mountain", "Gully & sheet erosion", "Contour ploughing, shelter belts"] },
    ] },
  flowchart: [
    { title: "Resource identified", desc: "technology makes it usable, culture accepts it" },
    { title: "Extraction/use", desc: "stocks drawn faster than nature renews them" },
    { title: "Depletion & pollution", desc: "salinity, gullies, barren land — future generations lose", type: "decision" },
    { title: "Sustainable path", desc: "contour ploughing, terrace farming, strip cropping, shelter belts + recycle", type: "result" },
  ],
  notes: [
    "<b>Stock</b> (oceans' water, we lack cheap tech to desalinate) vs <b>reserve</b> (coal we CAN mine today).",
    "Soil conservation on slopes: <b>contour ploughing</b> (across the slope), <b>terrace farming</b> (steps), <b>strip cropping</b>, <b>shelter belts</b> of trees in Rajasthan's deserts.",
    "Black soil is called <b>self-ploughing</b> — deep cracks form on drying and till in nutrients naturally.",
    "Laterite forms in <b>high rain + heat</b> — silica leaches down, iron stays → red, coarse, poor fertility.",
    "Over-irrigation without drainage lifts <b>salinity</b> — the Punjab canal-irrigated belt is the classic example.",
  ],
  quiz: [
    { q: "Which soil is best for cotton cultivation?", options: ["Alluvial", "Black (regur)", "Laterite", "Red"], answer: 1, why: "Moisture-retentive black Deccan-trap soil — the 'black cotton soil'." },
    { q: "Contour ploughing means ploughing:", options: ["Down the slope", "Across (along) the slope", "Only in valleys", "In circular patterns"], answer: 1, why: "Rows across the slope slow water runoff and check soil erosion." },
    { q: "The Brundtland Commission (1987) popularised:", options: ["Agenda 21", "Sustainable development", "Chipko movement", "Resource zoning"], answer: 1, why: "'Development that meets present needs without compromising future generations.'" },
  ],
  pyq: [
    "Classify resources on the basis of exhaustibility with examples. (CBSE 2023, 3m)",
    "Explain any three types of soil erosion with conservation methods. (CBSE 2022, 5m)",
    "Distinguish between khadar and bhangar. (CBSE 2020, 2m)",
  ],
},

"sst-1-1": {
  slides: [
    { kicker: "Geography Ch.2", title: "Forest and Wildlife Resources",
      points: ["Biodiversity = variety of life — India is one of the world's 17 mega-diverse countries with 4 hotspots (Himalaya, Western Ghats, Indo-Burma, Nicobar/Sundaland)", "IUCN categories: normal, endangered, vulnerable, rare, endemic, extinct", "Threats: habitat loss, poaching, over-grazing, forest fires, invasive species — the Great Indian Bustard is critically endangered"], formula: "Hotspots = richest + most threatened" },
    { kicker: "Colonial Roots", title: "Who Destroyed India's Forests?",
      points: ["Colonial era: 1878 Forest Act — Reserved (best, state only), Protected, Village forests; people's rights curbed", "Expansion of railways, plantations, farmland — forests fell for sleepers and cash crops", "Post-1947: agricultural expansion and development projects continued the damage"], formula: "Forest Act 1878: Reserved > Protected > Village" },
    { kicker: "Conservation", title: "People's Movements That Worked",
      points: ["Chipko (1973, Garhwal): village women hugged trees — Sunderlal Bahuguna's slogan 'ecology is permanent economy'", "Beej Bachao Andolan (Tehri): saving native seeds; Joint Forest Management (Odisha, 1988): villages guard degraded forest for a share of produce", "Wildlife Protection Act 1972; Project Tiger 1973 (Corbett); Gir's Asiatic lions, Kaziranga's one-horned rhino"], formula: "Community + law = conservation" },
    { kicker: "Forests Types", title: "India's Forest Types",
      points: ["Reserved Forests (50%+) — the most valuable, fully protected; Protected Forests; Unclassed Forests (villages, wastelands)", "Reserved + Protected = Permanent Forest Estates under state forest departments", "Sacred groves — forests protected by faith (e.g., in Meghalaya, Rajasthan)"], formula: "Faith can protect what law cannot" },
  ],
  mindmap: { central: "Forest & Wildlife",
    branches: [
      { label: "Biodiversity", color: "#146c2e", children: ["17 mega-diverse nations", "4 hotspots", "IUCN categories", "Endemic vs extinct"] },
      { label: "Destruction", color: "#c5221f", children: ["1878 Forest Act", "Railway sleepers", "Shifting cultivation (jhum)", "Poaching & fires"] },
      { label: "Movements", color: "#1a73e8", children: ["Chipko 1973", "Beej Bachao", "Joint Forest Management", "Sacred groves"] },
      { label: "State action", color: "#e37400", children: ["Wildlife Act 1972", "Project Tiger 1973", "Gir lions, Kaziranga rhino", "Biosphere reserves"] },
    ] },
  flowchart: [
    { title: "Forest gives life", desc: "fuel, fodder, fruit, water, habitat" },
    { title: "Pressure builds", desc: "railways, farms, dams, grazing, industry" },
    { title: "Conflict: people vs state", desc: "communities evicted while timber leaves", type: "decision" },
    { title: "Community conservation", desc: "Chipko, JFM, sacred groves — local stake = protection", type: "result" },
  ],
  notes: [
    "Chipko's power was <b>women's bodies between axe and tree</b> — Reni village (1974) became world-famous.",
    "<b>Endemic</b> species live in ONE area only (Nicobar megapode); <b>endangered</b> species are few and falling (Great Indian Bustard, snow leopard).",
    "The 1878 Act treated locals as <b>thieves</b> and forests as timber mines — the root of today's conflicts.",
    "JFM logic: village committees protect degraded land; in return they get <b>non-timber forest produce</b> and a share of final harvest.",
    "Kaziranga's rhino success shows strict protection + community tourism can work together.",
  ],
  quiz: [
    { q: "The Chipko movement (1973) began in:", options: ["Kerala", "Garhwal, Uttarakhand", "Bastar, Chhattisgarh", "Western Ghats"], answer: 1, why: "Himalayan villagers, led by Bahuguna, prevented contractors from felling trees." },
    { q: "Project Tiger was launched in:", options: ["1952", "1973", "1986", "1992"], answer: 1, why: "Started with 9 reserves including Corbett; tiger numbers have since recovered." },
    { q: "A species found only in a particular region is:", options: ["Endangered", "Endemic", "Extinct", "Vulnerable"], answer: 1, why: "Endemic = restricted to one area, e.g., the Andaman wild pig." },
  ],
  pyq: [
    "Explain any three categories of forests as per the Forest Act/ownership in India. (CBSE 2023, 3m)",
    "Describe the Chipko movement and its significance. (CBSE 2022, 3m)",
    "Distinguish between endangered and endemic species with examples. (CBSE 2020, 2m)",
  ],
},

"sst-1-2": {
  slides: [
    { kicker: "Geography Ch.3", title: "Water Resources",
      points: ["96.5% of Earth's water is salty; under 1% of freshwater is usable — water is renewable but SCARCE", "India has 4% of world's water but 16% of population; monsoon is seasonal & uneven", "Four months of monsoon must supply the whole year — hence dams, tanks, canals"], formula: "India: 4% water • 16% people" },
    { kicker: "Dams", title: "Multipurpose Projects — Temples of Modern India?",
      points: ["Nehru called dams 'temples of modern India': irrigation + electricity + flood control + water supply", "Classic dams: Bhakra-Nangal (Satluj), Hirakud (Mahanadi — among world's longest), DVC (1948, first multipurpose, Damodar 'sorrow of Bengal'), Nagarjuna Sagar (Krishna), Tehri (Bhagirathi, India's highest)", "Criticism: displacement (lakhs uprooted), silting, waterlogging, earthquake risk, forests lost"], formula: "One dam = power + irrigation + flood control" },
    { kicker: "Resistance", title: "When People Said No",
      points: ["Narmada Bachao Andolan (Medha Patkar): Sardar Sarovar displaced thousands without fair rehabilitation", "'Big dams: temples of doom?' — the debate continues", "Critics: rainwater harvesting and local tanks are cheaper, fairer, greener"], formula: "No resettlement = no justice" },
    { kicker: "Harvest", title: "Traditional Wisdom",
      points: ["Rajasthan: khadins, johads, tankas; Meghalaya: bamboo-drip irrigation and 80%+ rooftop harvesting in Shillong", "Ancient: 11th-century Bhopal lake; 14th-century Hauz Khas tank, Delhi", "Roof-to-recharge is the modern version of an old idea"], formula: "Catch rain where it falls" },
  ],
  mindmap: { central: "Water Resources",
    branches: [
      { label: "Scarcity", color: "#1a73e8", children: ["Under 1% usable", "4% water, 16% people", "Uneven monsoon", "Groundwater falling"] },
      { label: "Big projects", color: "#e37400", children: ["Bhakra-Nangal", "Hirakud", "DVC 1948", "Tehri (highest)", "Nehru: 'temples'"] },
      { label: "Problems", color: "#c5221f", children: ["Displacement", "Silting & waterlogging", "Narmada Bachao Andolan", "Seismic risk"] },
      { label: "Harvesting", color: "#146c2e", children: ["Khadins, johads, tankas", "Bamboo drip (Meghalaya)", "Rooftop recharge", "Reviving old tanks"] },
    ] },
  flowchart: [
    { title: "Rain falls 4 months", desc: "most runs to the sea or floods plains" },
    { title: "Storage choice", desc: "big dam upstream OR local harvesting structures", type: "decision" },
    { title: "Big dam path", desc: "power + canal irrigation — but displacement, silting, protests" },
    { title: "Local path", desc: "tanks, recharge pits, watershed — cheap, community-owned", type: "result" },
  ],
  notes: [
    "<b>Hydrological cycle</b> makes water renewable — but pollution and over-pumping make it scarce.",
    "Know dam-river pairs: Bhakra-Nangal→Satluj, Hirakud→Mahanadi, Nagarjuna Sagar→Krishna, Tehri→Bhagirathi, DVC→Damodar.",
    "<b>Tehri</b> on the Bhagirathi is India's highest dam; <b>Hirakud</b> is among the longest in the world.",
    "The Narmada conflict showed the human cost: <b>rehabilitation before displacement</b> is the settled principle now.",
    "In Shillong, rooftop harvesting meets a large share of household demand — proof it works even in the wettest town.",
  ],
  quiz: [
    { q: "The Hirakud Dam is built on the river:", options: ["Satluj", "Mahanadi", "Krishna", "Damodar"], answer: 1, why: "Hirakud (Odisha) on the Mahanadi is among the world's longest dams." },
    { q: "Who led the Narmada Bachao Andolan?", options: ["Sunderlal Bahuguna", "Medha Patkar", "Sunita Narain", "Rajendra Singh"], answer: 1, why: "It questioned Sardar Sarovar displacement without rehabilitation." },
    { q: "Bamboo drip irrigation is practised in:", options: ["Rajasthan", "Meghalaya", "Punjab", "Gujarat"], answer: 1, why: "Tribal farmers of Meghalaya channel stream water through bamboo to crop roots." },
  ],
  pyq: [
    "Why are multipurpose projects opposed? Give three reasons with the Narmada example. (CBSE 2023, 5m)",
    "Describe any two traditional water harvesting systems of India. (CBSE 2022, 3m)",
    "Explain how water becomes a renewable resource yet scarce. (CBSE 2020, 3m)",
  ],
},

"sst-1-3": {
  slides: [
    { kicker: "Geography Ch.4", title: "Agriculture",
      points: ["About half of India's net sown area feeds a majority of workers — farming IS India's backbone", "Types by purpose: primitive subsistence (jhum/slash-and-burn in NE), intensive subsistence (Ganga plains), commercial (plantation: tea, coffee, rubber)", "Cropping seasons: Rabi (Oct–Mar: wheat, gram, mustard), Kharif (Jun–Sep: rice, jute, cotton), Zaid (Apr–Jun: watermelon, fodder)"], formula: "Rabi sown winter • Kharif sown monsoon • Zaid fills summer" },
    { kicker: "Crops", title: "Know Your Crops — States & Conditions",
      points: ["Rice: WB, UP, Punjab — kharif, needs 100cm+ rain or irrigation; Wheat: Punjab, Haryana, UP — rabi, 10-15°C sowing", "Millets (nutri-cereals): bajra (Rajasthan, sandy), jowar (Maharashtra), ragi (Karnataka); Pulses: tur/arhar — Madhya Pradesh leads", "Sugarcane: UP + Maharashtra (India 2nd after Brazil); Tea: Assam & Darjeeling; Coffee: Karnataka's Baba Budan hills (Arabica from Yemen); Cotton: Gujarat/Maharashtra black soil; Jute: WB delta 'golden fibre'; Rubber: Kerala"], formula: "Tea-Assam • Coffee-Karnataka • Cotton-Gujarat • Jute-Bengal" },
    { kicker: "Reform", title: "Revolutions and Reforms",
      points: ["Green Revolution (mid-1960s): HYV seeds + fertiliser + irrigation — Punjab, Haryana, west UP became grain surpluses; M.S. Swaminathan's role", "White Revolution: Operation Flood (Verghese Kurien, Anand) — India became the largest milk producer", "Support system: Minimum Support Price, Kisan Credit Card, crop insurance, subsidies on power & fertiliser"], formula: "Green = grain • White = milk • Blue = fish" },
    { kicker: "Challenges", title: "Food Security & Globalisation",
      points: ["FCI buffer stock + PDS fight hunger; but Green Revolution areas face falling water tables and sick soils", "Globalisation: opportunity (basmati, spices exports) and threat (contract farming, price risk)", "Sustainable shift needed: organic, millets, drip irrigation, better Mandis/e-NAM"], formula: "Produce + procure + distribute = food security" },
  ],
  mindmap: { central: "Agriculture",
    branches: [
      { label: "Farming types", color: "#146c2e", children: ["Primitive subsistence (jhum)", "Intensive subsistence", "Commercial & plantation"] },
      { label: "Seasons", color: "#1a73e8", children: ["Rabi: wheat, mustard", "Kharif: rice, jute, cotton", "Zaid: melons, fodder"] },
      { label: "Crops & states", color: "#e37400", children: ["Rice: WB/UP", "Wheat: Punjab/Haryana", "Tea: Assam • Coffee: Karnataka", "Cotton: Gujarat • Jute: WB"] },
      { label: "Reform", color: "#9334e6", children: ["Green Revolution", "White Revolution (Kurien)", "MSP, KCC, insurance", "FCI + PDS"] },
    ] },
  flowchart: [
    { title: "Mid-1960s crisis", desc: "food shortages, imports under PL-480" },
    { title: "Green Revolution package", desc: "HYV seeds + tube wells + fertiliser + MSP" },
    { title: "Output soars", desc: "Punjab-Haryana-UP become granaries — imports end" },
    { title: "Second-generation problems", desc: "water tables fall, soil sickens → millets & sustainability push today", type: "result" },
  ],
  notes: [
    "Season-crop pairs are guaranteed marks: <b>Rabi = wheat/gram/mustard; Kharif = rice/maize/jute/cotton; Zaid = watermelon/cucumber</b>.",
    "<b>Jute</b>: hot, humid Ganga-Brahmaputra delta — West Bengal; called the golden fibre.",
    "Millets are back as <b>'Shree Anna' nutri-cereals</b> — 2023 was the International Year of Millets.",
    "Operation Flood made Anand (Gujarat) the dairy capital — <b>Amul's cooperative model</b> is the exam favourite.",
    "Subsidy debate: cheap power & fertiliser help poor farmers but cause over-pumping and soil damage — balanced answer wins marks.",
  ],
  quiz: [
    { q: "Which of the following is a Rabi crop?", options: ["Rice", "Jute", "Wheat", "Cotton"], answer: 2, why: "Rabi crops are sown in winter (Oct-Nov) and harvested in March-April." },
    { q: "Operation Flood is associated with:", options: ["Wheat", "Milk", "Fish", "Oilseeds"], answer: 1, why: "Verghese Kurien's Anand cooperative model made India the top milk producer." },
    { q: "Baba Budan hills are famous for:", options: ["Tea", "Coffee", "Rubber", "Spices"], answer: 1, why: "Coffee (Arabica, brought from Yemen) grows in Karnataka's Baba Budan hills." },
  ],
  pyq: [
    "Compare Rabi and Kharif cropping seasons with examples. (CBSE 2023, 3m)",
    "Describe the geographical conditions required for the growth of rice. (CBSE 2022, 3m)",
    "What was the Green Revolution? Mention two positive and two negative effects. (CBSE 2020, 5m)",
  ],
},

"sst-1-4": {
  slides: [
    { kicker: "Geography Ch.5", title: "Minerals and Energy Resources",
      points: ["Geologists define minerals as natural homogenous solids; in industry = energy + metals + raw materials", "Formation: igneous & metamorphic rocks → metallic minerals (iron, copper, bauxite); sedimentary rocks → coal, petroleum", "Iron ores: magnetite (70% iron, finest) and hematite (50-60%, most mined); ferrous vs non-ferrous; non-metallic: mica, limestone"], formula: "Rocks → minerals → metals & fuel" },
    { kicker: "Metals", title: "Belts and Famous Mines",
      points: ["Iron: Odisha-Jharkhand belt, Durg-Bastar-Chandrapur (Bailadila exports to Japan), Ballari-Chitradurga (Karnataka), Maharashtra-Goa", "Copper: Khetri (Rajasthan), Singhbhum (Jharkhand); Bauxite: Kalahandi-Koraput (Odisha), Amarkantak, Jharkhand", "Mica: Koderma (Jharkhand) — the mica belt; Limestone: major in Andhra Pradesh, Madhya Pradesh, Rajasthan"], formula: "Iron-Bailadila • Copper-Khetri • Mica-Koderma" },
    { kicker: "Conventional", title: "Coal, Oil and Gas",
      points: ["Coal ranks: anthracite (best, 80%+ carbon) > bituminous > lignite > peat; Gondwana fields: Jharia, Bokaro, Raniganj; Neyveli (TN) = lignite", "Petroleum: Digboi (Assam, oldest), Mumbai High (offshore), Ankleshwar (Gujarat); 'energy security' concern — imports dominate", "Natural gas: Krishna-Godavari basin, Mumbai High; clean fuel; HVJ pipeline (Hazira-Vijaipur-Jagdishpur)" ], formula: "Anthracite > bituminous > lignite > peat" },
    { kicker: "Renewables", title: "Non-Conventional Energy",
      points: ["Solar: Bhadla (Rajasthan) is among the world's largest solar parks; wind: India is a top-4 wind-power nation (Muppandal TN, Jaisalmer)", "Nuclear: uranium (Jaduguda, Jharkhand), thorium in Kerala's monazite sands — Tarapur, Kudankulam, Kaiga plants", "Biogas (gobar gas) for villages; tidal (Gulf of Kachchh); geothermal (Manikaran, Puga valley)" ], formula: "Sun + wind + atom + biogas = energy security" },
  ],
  mindmap: { central: "Minerals & Energy",
    branches: [
      { label: "Iron & metals", color: "#c5221f", children: ["Magnetite vs hematite", "Bailadila, Odisha belts", "Copper: Khetri", "Bauxite: Koraput", "Mica: Koderma"] },
      { label: "Coal", color: "#1a73e8", children: ["Anthracite best", "Jharia, Bokaro, Raniganj", "Neyveli lignite", "Gondwana fields"] },
      { label: "Oil & gas", color: "#e37400", children: ["Digboi oldest", "Mumbai High", "Ankleshwar", "KG basin gas", "HVJ pipeline"] },
      { label: "Renewables", color: "#146c2e", children: ["Bhadla solar", "Wind: Muppandal", "Nuclear: Tarapur, Kudankulam", "Biogas, tidal, geothermal"] },
    ] },
  flowchart: [
    { title: "Fossil fuel era", desc: "coal → oil → gas powered industrial India" },
    { title: "The squeeze", desc: "limited reserves, import bills, pollution", type: "decision" },
    { title: "The pivot", desc: "solar parks, wind farms, nuclear, biogas" },
    { title: "Energy security", desc: "domestic renewables + efficiency = sustainable future", type: "result" },
  ],
  notes: [
    "Pair every mineral with its mine — <b>Bailadila (iron, exported to Japan), Khetri (copper), Koderma (mica), Jaduguda (uranium), Digboi (oldest oil)</b>.",
    "Conventional sources are <b>exhaustible and polluting</b>; non-conventional are mostly renewable — the key 1-mark distinction.",
    "Thorium in Kerala's <b>monazite sands</b> can power India's future three-stage nuclear programme.",
    "HVJ gas pipeline: <b>Hazira–Vijaipur–Jagdishpur</b>; Salaya–Mathura carries crude.",
    "Energy conservation: public transport, LEDs, efficient appliances — 'energy saved is energy produced'.",
  ],
  quiz: [
    { q: "The best variety of coal is:", options: ["Peat", "Lignite", "Bituminous", "Anthracite"], answer: 3, why: "Anthracite has 80%+ carbon and the highest heat value." },
    { q: "Bailadila mines, famous for iron ore exports, are in:", options: ["Jharkhand", "Chhattisgarh (Bastar)", "Karnataka", "Goa"], answer: 1, why: "The Durg-Bastar-Chandrapur belt's Bailadila range exports to Japan." },
    { q: "India's oldest oil field is:", options: ["Mumbai High", "Ankleshwar", "Digboi", "Kalol"], answer: 2, why: "Digboi in Assam — oil struck in the 19th century." },
  ],
  pyq: [
    "Distinguish between ferrous and non-ferrous minerals with examples. (CBSE 2023, 3m)",
    "Name the belts of iron ore in India and describe any one. (CBSE 2022, 3m)",
    "Why should we promote non-conventional energy sources? Give three reasons. (CBSE 2020, 3m)",
  ],
},

"sst-1-5": {
  slides: [
    { kicker: "Geography Ch.6", title: "Manufacturing Industries",
      points: ["Manufacturing = producing goods in large volumes after processing raw materials (paper from bamboo, cloth from cotton)", "Industry classification: by raw material (agro-based vs mineral-based), by ownership (public/private/joint/cooperative), by scale", "Location factors: raw material, power, market, labour, transport, capital — industry sits where costs are lowest"], formula: "Raw material + power + market + labour = location" },
    { kicker: "Agro", title: "Textile, Sugar and Agro Industries",
      points: ["Cotton textiles: first modern mill — Mumbai (1854); Mumbai-Pune and Ahmedabad ('Manchester of India') clusters; India = world's largest producer of jute goods and a top cotton-textile maker", "Sugar: UP + Maharashtra; seasonal, cooperative sector; mills sit IN cane fields (sucrose dries out in transit)", "Other agro: silk, wool, vegetable oil (most are in sector... public?) — many in cooperative hands"], formula: "Sugar mills follow the cane" },
    { kicker: "Mineral", title: "Steel, Aluminium, Cement, Vehicles",
      points: ["Iron & steel = basic industry: TISCO Jamshedpur (1907, private), Bhilai, Rourkela, Durgapur (public, with Soviet/German/UK help); Chhotanagpur belt = minerals + coal + Kolkata market", "Aluminium smelting: Korba, Renukoot, Hirakud; second most used metal; Automobiles: Pune-Chennai clusters; electronics: Bengaluru", "Cement plants near limestone; fertiliser, paper, shipbuilding (Vishakhapatnam, Kochi)"], formula: "Steel: TISCO 1907 • Public: Bhilai, Rourkela, Durgapur" },
    { kicker: "Price", title: "Industrial Pollution and Control",
      points: ["Air (smelting, cement), water (paper, textile effluents), soil, thermal & noise pollution", "NTPC is a model: treated water, ash recycling, green belts", "Solutions: treatment plants, recycling, rainwater harvesting, clean tech, relocating units, environmental impact assessment"], formula: "Treat → recycle → monitor" },
  ],
  mindmap: { central: "Manufacturing",
    branches: [
      { label: "Basics", color: "#1a73e8", children: ["Agro vs mineral based", "Public/private/joint", "Location factors"] },
      { label: "Agro industries", color: "#146c2e", children: ["Cotton: Mumbai, Ahmedabad", "Sugar: UP-Maharashtra", "Cooperative sector"] },
      { label: "Mineral industries", color: "#c5221f", children: ["Steel: Jamshedpur 1907", "Bhilai, Rourkela, Durgapur", "Aluminium: Korba, Renukoot", "Chhotanagpur belt"] },
      { label: "Pollution & care", color: "#e37400", children: ["Air, water, soil, noise", "NTPC's green norms", "Treatment + recycling"] },
    ] },
  flowchart: [
    { title: "Locate", desc: "raw material + power + labour + market + transport decide the site" },
    { title: "Produce", desc: "raw material → processing → finished goods" },
    { title: "Waste streams", desc: "effluents, smoke, ash leave the plant", type: "decision" },
    { title: "Responsible industry", desc: "treat, recycle, monitor — growth WITH environment", type: "result" },
  ],
  notes: [
    "India is the <b>largest producer of jute goods</b> and among the top steel producers; sponge iron is a niche we lead.",
    "Why sugar mills are rural: <b>sucrose dries in transit</b> — cane must be crushed within 24 hours.",
    "Ahmedabad = <b>'Manchester of India'</b> (cotton); Jamshedpur = India's first steel city (TISCO, 1907).",
    "Bhilai & Rourkela & Durgapur are <b>public-sector integrated steel plants</b> — in the Chhotanagpur mineral belt near coal.",
    "Industrial pollution answer frame: name type + source + harm + one control measure.",
  ],
  quiz: [
    { q: "Which city is called the 'Manchester of India'?", options: ["Mumbai", "Ahmedabad", "Kanpur", "Coimbatore"], answer: 1, why: "Ahmedabad's cotton-textile cluster earned the title." },
    { q: "Sugar mills are located near cane fields because:", options: ["Cane is heavy", "Sucrose content dries out quickly after cutting", "Workers live in villages", "Government orders it"], answer: 1, why: "Cane must reach the mill within ~24 hours or sugar recovery falls." },
    { q: "India's first iron and steel plant (1907) was at:", options: ["Bhilai", "Rourkela", "Jamshedpur", "Burnpur"], answer: 2, why: "TISCO, set up by Jamsetji Tata at Sakchi (Jamshedpur)." },
  ],
  pyq: [
    "Explain the factors that decide the location of an industry. (CBSE 2023, 3m)",
    "Why is the iron and steel industry called a basic industry? (CBSE 2022, 3m)",
    "Describe three types of industrial pollution and their remedies. (CBSE 2020, 5m)",
  ],
},

"sst-1-6": {
  slides: [
    { kicker: "Geography Ch.7", title: "Lifelines of National Economy",
      points: ["Transport, communication and trade bind the country into one market — the lifelines", "Roads: Golden Quadrilateral (Delhi-Mumbai-Chennai-Kolkata) + N-S & E-W corridors; Border Roads Organisation builds frontier roads", "Railways: first line 1853 (Bombay-Thane, 34 km); India has one of Asia's largest networks; gauge conversion & Konkan Railway feats"], formula: "1853: Bombay → Thane (34 km)" },
    { kicker: "Modes", title: "Pipelines, Waterways and Airways",
      points: ["Pipelines: crude & gas — Naharkatiya Barauni, Salaya-Mathura, HVJ gas", "Waterways are cheapest for heavy cargo: NW-1 Ganga (Haldia-Prayagraj, 1620 km), NW-2 Brahmaputra (Sadiya-Dhubri), NW-3 West Coast Canal (Kerala)", "Airways are costliest but reach NE hills, deserts; essential during disasters; 1953 nationalisation; today open to private airlines"], formula: "Cheapest = water • Fastest = air" },
    { kicker: "Communication", title: "Personal & Mass Communication",
      points: ["Personal: post, telephone, e-mail; Mass: TV, radio, newspapers, films", "India's postal network is the world's largest; first-class vs book-post mail", "The telecom + internet revolution (UPI!) has made communication a true lifeline of the economy"], formula: "Personal + mass = communication" },
    { kicker: "Trade", title: "International Trade & Tourism",
      points: ["Exports minus imports = balance of trade; India's balance is negative — we import more (crude oil dominates)", "Tourism is a giant invisible export: heritage (Rajasthan), beaches (Goa), Himalayas (trekking), Ayurveda (Kerala) support lakhs of jobs", "Trade + tourism promote national integration & international understanding"], formula: "Trade balance = exports − imports" },
  ],
  mindmap: { central: "Lifelines of National Economy",
    branches: [
      { label: "Roads", color: "#1a73e8", children: ["Golden Quadrilateral", "N-S & E-W corridors", "Border Roads (BRO)", "PMGSY rural roads"] },
      { label: "Rail & others", color: "#e37400", children: ["1853 first railway", "Konkan Railway", "Pipelines: HVJ", "NW-1/2/3 waterways", "Airways for hills"] },
      { label: "Communication", color: "#146c2e", children: ["World's largest postal net", "Mass media", "Internet & UPI"] },
      { label: "Trade & tourism", color: "#9334e6", children: ["Balance of trade", "Tourism = jobs", "Heritage circuits"] },
    ] },
  flowchart: [
    { title: "Goods produced", desc: "farm & factory output ready to move" },
    { title: "Choose a mode", desc: "cost vs speed vs terrain vs bulk", type: "decision" },
    { title: "Move & communicate", desc: "transport + telecom connect buyer-seller" },
    { title: "Market & trade", desc: "national integration + foreign exchange", type: "result" },
  ],
  notes: [
    "Golden Quadrilateral links the <b>4 metros (6-lane)</b>; the N-S corridor is Srinagar-Kanyakumari, E-W is Silchar-Porbandar.",
    "National Waterways: <b>NW-1 Ganga (1620 km), NW-2 Brahmaputra, NW-3 West Coast Canal</b> — 111 NWs declared in 2016.",
    "Railway facts for exams: <b>1853 Bombay-Thane</b>; 16+ zones; Konkan Railway (Roha-Mangalore) crossed the Western Ghats.",
    "Airways: <b>costliest but fastest</b>; lifeline for the north-east, islands & disaster relief.",
    "Tourism supports <b>handicrafts, hotels, transport</b> — India's 'Incredible India' circuits earn foreign exchange.",
  ],
  quiz: [
    { q: "The Golden Quadrilateral connects:", options: ["The 4 metros", "Ports of the west coast", "Srinagar to Kanyakumari", "Silchar to Porbandar"], answer: 0, why: "Delhi-Mumbai-Chennai-Kolkata form the golden quadrilateral." },
    { q: "NW-1 is on the river:", options: ["Brahmaputra", "Ganga", "Godavari", "Mahanadi"], answer: 1, why: "NW-1: Haldia to Prayagraj on the Ganga (1620 km)." },
    { q: "India's first railway ran in 1853 between:", options: ["Delhi and Agra", "Bombay and Thane", "Howrah and Delhi", "Madras and Bangalore"], answer: 1, why: "34 km, Bombay (Bori Bunder) to Thane." },
  ],
  pyq: [
    "State any three merits of roadways over railways. (CBSE 2023, 3m)",
    "What is the Golden Quadrilateral? Name its four cities. (CBSE 2022, 2m)",
    "Why is tourism called a lifeline of the national economy? (CBSE 2020, 3m)",
  ],
},

};
