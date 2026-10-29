const vehicles = [
  {
    "id": 1,
    "key": "porsche",
    "brand": "Porsche",
    "model": "911 Carrera GTS",
    "version": "992 · 3.0 PDK",
    "category": "Esportivo",
    "year": 2022,
    "km": 12000,
    "price": 1199900,
    "engine": "3.0 boxer 6 biturbo",
    "power": 480,
    "gear": "PDK · 8 marchas",
    "drive": "Traseira",
    "accel": "3,3 s",
    "color": "Azul",
    "desc": "Um ícone de motor traseiro, com resposta rápida do câmbio PDK e vocação para curvas.",
    "features": [
      "Pacote Sport Chrono",
      "Suspensão esportiva PASM",
      "Escapamento esportivo"
    ],
    "photo": "imagens/foto-01.jpg",
    "credit": {
      "author": "Calreyn88",
      "license": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2022_Porsche_911_992_Carrera_GTS.jpg"
  },
  {
    "id": 2,
    "key": "bmw",
    "brand": "BMW",
    "model": "M4 Competition Coupé",
    "version": "G82 · 3.0 M Steptronic",
    "category": "Esportivo",
    "year": 2022,
    "km": 18000,
    "price": 729900,
    "engine": "3.0 seis em linha biturbo",
    "power": 510,
    "gear": "M Steptronic · 8 marchas",
    "drive": "Traseira",
    "accel": "3,9 s",
    "color": "Azul",
    "desc": "Um cupê que une seis cilindros em linha, tração traseira e quatro lugares.",
    "features": [
      "Diferencial ativo M",
      "Modos de condução M",
      "Bancos esportivos"
    ],
    "photo": "imagens/foto-02.jpg",
    "credit": {
      "author": "Alexandre Prevot",
      "license": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:BMW_M4_Competition_Coup%C3%A9_G82_front_view.jpg"
  },
  {
    "id": 3,
    "key": "mercedes",
    "brand": "Mercedes-AMG",
    "model": "GT S Coupé",
    "version": "C190 · 4.0 V8 biturbo",
    "category": "Esportivo",
    "year": 2016,
    "km": 26000,
    "price": 899900,
    "engine": "4.0 V8 biturbo",
    "power": 510,
    "gear": "Dupla embreagem · 7 marchas",
    "drive": "Traseira",
    "accel": "3,8 s",
    "color": "Amarelo",
    "desc": "Capô longo, posição de dirigir baixa e motor V8: um gran turismo de personalidade forte.",
    "features": [
      "Suspensão AMG Ride Control",
      "Diferencial traseiro eletrônico",
      "Escape esportivo AMG"
    ],
    "photo": "imagens/foto-03.jpg",
    "credit": {
      "author": "Tokumeigakarinoaoshima",
      "license": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    "source": "https://commons.wikimedia.org/wiki/File:Mercedes-AMG_GT_S_%28C190%29_front.JPG"
  },
  {
    "id": 4,
    "key": "audi",
    "brand": "Audi",
    "model": "R8 V10 Performance",
    "version": "5.2 FSI quattro · Coupé",
    "category": "Superesportivo",
    "year": 2020,
    "km": 14000,
    "price": 1599900,
    "engine": "5.2 V10 aspirado",
    "power": 620,
    "gear": "S tronic · 7 marchas",
    "drive": "Integral quattro",
    "accel": "3,1 s",
    "color": "Azul",
    "desc": "Motor central aspirado e tração integral em um superesportivo de duas portas.",
    "features": [
      "Audi virtual cockpit",
      "Audi drive select",
      "Motor central-traseiro"
    ],
    "photo": "imagens/foto-04.jpg",
    "credit": {
      "author": "Kevauto",
      "license": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2019_Audi_R8_V10_performance_quattro_front_NYIAS_2019.jpg"
  },
  {
    "id": 5,
    "key": "range",
    "brand": "Land Rover",
    "model": "Range Rover Autobiography",
    "version": "L460 · P530 V8",
    "category": "SUV de luxo",
    "year": 2022,
    "km": 24000,
    "price": 1299900,
    "engine": "4.4 V8 biturbo",
    "power": 530,
    "gear": "Automático · 8 marchas",
    "drive": "Integral",
    "accel": "4,6 s",
    "color": "Cinza",
    "desc": "Conforto de um SUV de luxo com força de V8 e suspensão a ar.",
    "features": [
      "Suspensão pneumática",
      "Direção nas quatro rodas",
      "Terrain Response 2"
    ],
    "photo": "imagens/foto-05.jpg",
    "credit": {
      "author": "Авто Плюс Новости",
      "license": "https://creativecommons.org/licenses/by/3.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2022_Land_Rover_Range_Rover_front.png"
  },
  {
    "id": 6,
    "key": "ferrari",
    "brand": "Ferrari",
    "model": "488 GTB",
    "version": "3.9 V8 · F1 DCT",
    "category": "Superesportivo",
    "year": 2017,
    "km": 11000,
    "price": 2899900,
    "engine": "3.9 V8 biturbo",
    "power": 670,
    "gear": "F1 DCT · 7 marchas",
    "drive": "Traseira",
    "accel": "3,0 s",
    "color": "Vermelho",
    "desc": "Uma berlinetta de motor central com aceleração intensa e desenho marcado pela aerodinâmica.",
    "features": [
      "Freios de carbono-cerâmica",
      "Seletor Manettino",
      "Diferencial eletrônico E-Diff"
    ],
    "photo": "imagens/foto-06.jpg",
    "credit": {
      "author": "Vauxford",
      "license": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2017_Ferrari_488_GTB_Automatic_3.9_Front.jpg"
  },
  {
    "id": 7,
    "key": "lamborghini",
    "brand": "Lamborghini",
    "model": "Huracán EVO",
    "version": "LP 640-4 · 5.2 V10",
    "category": "Superesportivo",
    "year": 2020,
    "km": 9000,
    "price": 3299900,
    "engine": "5.2 V10 aspirado",
    "power": 640,
    "gear": "Dupla embreagem · 7 marchas",
    "drive": "Integral",
    "accel": "2,9 s",
    "color": "Amarelo",
    "desc": "O V10 aspirado encontra tração integral e direção nas quatro rodas.",
    "features": [
      "Controle integrado LDVI",
      "Direção nas quatro rodas",
      "Freios de carbono-cerâmica"
    ],
    "photo": "imagens/foto-07.jpg",
    "credit": {
      "author": "Vauxford",
      "license": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2019_Lamborghini_Huracan_EVO_LP_640-4_S-A_5.2_Front.jpg"
  },
  {
    "id": 8,
    "key": "mclaren",
    "brand": "McLaren",
    "model": "720S Spider",
    "version": "4.0 V8 · SSG",
    "category": "Conversível",
    "year": 2020,
    "km": 8000,
    "price": 3599900,
    "engine": "4.0 V8 biturbo",
    "power": 720,
    "gear": "SSG · 7 marchas",
    "drive": "Traseira",
    "accel": "2,9 s",
    "color": "Amarelo",
    "desc": "Superesportivo conversível com estrutura de fibra de carbono e teto rígido retrátil.",
    "features": [
      "Teto rígido retrátil",
      "Estrutura de fibra de carbono",
      "Portas de abertura diédrica"
    ],
    "photo": "imagens/foto-08.jpg",
    "credit": {
      "author": "LuvsMG481",
      "license": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2020_McLaren_720S_front.jpg"
  },
  {
    "id": 9,
    "key": "bentley",
    "brand": "Bentley",
    "model": "Continental GT V8",
    "version": "3ª geração · 4.0 biturbo",
    "category": "Gran turismo",
    "year": 2020,
    "km": 22000,
    "price": 1799900,
    "engine": "4.0 V8 biturbo",
    "power": 550,
    "gear": "Dupla embreagem · 8 marchas",
    "drive": "Integral",
    "accel": "4,0 s",
    "color": "Prata",
    "desc": "Um gran turismo para viagens longas, com acabamento refinado e torque de V8.",
    "features": [
      "Cabine com quatro lugares",
      "Suspensão pneumática",
      "Acabamento em couro"
    ],
    "photo": "imagens/foto-09.jpg",
    "credit": {
      "author": "Vauxford",
      "license": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2019_Bentley_Continental_GT_V8_Automatic_4.0_Front.jpg"
  },
  {
    "id": 10,
    "key": "rs6",
    "brand": "Audi",
    "model": "RS 6 Avant",
    "version": "C8 · 4.0 TFSI quattro",
    "category": "Perua esportiva",
    "year": 2021,
    "km": 27000,
    "price": 939900,
    "engine": "4.0 V8 biturbo",
    "power": 600,
    "gear": "Tiptronic · 8 marchas",
    "drive": "Integral quattro",
    "accel": "3,6 s",
    "color": "Cinza",
    "desc": "Espaço de perua e desempenho de esportivo em um único carro.",
    "features": [
      "Sistema híbrido leve de 48 V",
      "Audi drive select",
      "Carroceria Avant de cinco portas"
    ],
    "photo": "imagens/foto-10.jpg",
    "credit": {
      "author": "Mr.choppers",
      "license": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2021_Audi_RS6_Avant_in_Nardo_Gray%2C_front_right.jpg"
  },
  {
    "id": 11,
    "key": "cayenne",
    "brand": "Porsche",
    "model": "Cayenne Turbo GT",
    "version": "Coupé · 4.0 V8",
    "category": "SUV de luxo",
    "year": 2022,
    "km": 19000,
    "price": 1499900,
    "engine": "4.0 V8 biturbo",
    "power": 640,
    "gear": "Tiptronic S · 8 marchas",
    "drive": "Integral",
    "accel": "3,3 s",
    "color": "Verde",
    "desc": "A proposta esportiva da Porsche em um SUV cupê com quatro lugares.",
    "features": [
      "Teto em fibra de carbono",
      "Freios Porsche PCCB",
      "Escape esportivo em titânio"
    ],
    "photo": "imagens/foto-11.jpg",
    "credit": {
      "author": "Calreyn88",
      "license": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2022_Porsche_Cayenne_Turbo_GT.jpg"
  },
  {
    "id": 12,
    "key": "aston",
    "brand": "Aston Martin",
    "model": "DB11 V8 Coupé",
    "version": "4.0 biturbo · Touchtronic",
    "category": "Gran turismo",
    "year": 2018,
    "km": 21000,
    "price": 1399900,
    "engine": "4.0 V8 biturbo",
    "power": 510,
    "gear": "Automático · 8 marchas",
    "drive": "Traseira",
    "accel": "4,0 s",
    "color": "Prata",
    "desc": "Linhas britânicas, configuração 2+2 e um V8 biturbo para viajar com estilo.",
    "features": [
      "Configuração de bancos 2+2",
      "Amortecimento adaptativo",
      "Carroceria em alumínio"
    ],
    "photo": "imagens/foto-12.jpg",
    "credit": {
      "author": "Vauxford",
      "license": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    "source": "https://commons.wikimedia.org/wiki/File:2018_Aston_Martin_DB11_V8_Automatic_4.0_Front.jpg"
  }
];
