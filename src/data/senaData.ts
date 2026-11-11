import { Apprentice, InstructorProfile, Quiz, EthicalCase, RegulationArticle, InstitutionalSymbol } from '../types';

export const SENA_IDENTITY = {
  institutionName: 'Servicio Nacional de Aprendizaje - SENA',
  motto: 'Conocimiento y competitividad para todos los colombianos',
  mission: 'El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision: 'En el 2026, el SENA se consolidará como una entidad referente de formación profesional integral, aceleradora de la transformación digital, la innovación, la sostenibilidad y la inclusión social para el trabajo decente y el progreso de Colombia.',
  values: [
    { name: 'Integridad', desc: 'Actuamos siempre con honestidad, coherencia, transparencia y rectitud en cada ambiente de aprendizaje y comunidad.' },
    { name: 'Respeto', desc: 'Reconocemos y valoramos la dignidad, la diversidad y los derechos de cada aprendiz, instructor y colaborador.' },
    { name: 'Compromiso', desc: 'Asumimos con dedicación, vocación y pasión las responsabilidades con nuestra formación y el desarrollo de Colombia.' },
    { name: 'Justicia y Equidad', desc: 'Garantizamos trato imparcial, oportunidades iguales y convivencia armónica en la comunidad educativa.' },
    { name: 'Solidaridad', desc: 'Trabajamos en equipo, apoyando a nuestros compañeros con empatía y espíritu de colaboración mutua.' },
    { name: 'Liderazgo', desc: 'Inspiramos el cambio positivo mediante la innovación, el esfuerzo disciplinado y el ejemplo constructivo.' }
  ],
  platforms: [
    { name: 'SOFIA Plus', desc: 'Sistema Optimizado para la Formación Integral del Aprendizaje Activo (inscripciones, matrículas, certificados y calificaciones).' },
    { name: 'Zajuna (LMS)', desc: 'Ambiente Virtual de Aprendizaje institucional oficial donde accedes a guías de aprendizaje, foros y evidencias.' },
    { name: 'Correo @misena.edu.co', desc: 'Cuenta de correo electrónico institucional y suite de productividad académica para el aprendiz.' },
    { name: 'Sistema de Bibliotecas SENA', desc: 'Catálogo digital con bases de datos especializadas, libros, artículos científicos y repositorios técnicos.' },
    { name: 'Bienestar al Aprendiz', desc: 'Área dedicada a la salud, cultura, deportes, orientación psicosocial y apoyos socioeconómicos de sostenimiento.' },
    { name: 'Agencia Pública de Empleo (APE)', desc: 'Servicio público gratuito que intermedia entre los aprendices y egresados y las empresas de Colombia.' }
  ]
};

export const SENA_SYMBOLS: InstitutionalSymbol[] = [
  {
    id: 'escudo',
    name: 'Escudo del SENA',
    shortDesc: 'Sintetiza los tres sectores fundamentales de la economía colombiana.',
    fullMeaning: 'El escudo del SENA fue diseñado en los orígenes de la entidad para condensar visualmente la articulación de la formación profesional integral con las fuerzas productivas de Colombia. Cada elemento en su heráldica representa un sector de la economía nacional.',
    elements: [
      {
        name: 'Rueda Dentada (Piñón)',
        significance: 'Representa el Sector Secundario o de la Industria y la Construcción. Simboliza el esfuerzo manufacturero, la ingeniería, la tecnología y el trabajo transformador.'
      },
      {
        name: 'Caduceo Mercurial y Antorcha',
        significance: 'Representa el Sector Terciario o de Comercio y Servicios. Simboliza las relaciones comerciales, la salud, la gestión administrativa y el conocimiento que ilumina el porvenir.'
      },
      {
        name: 'Ramas de Café y Espigas',
        significance: 'Representa el Sector Primario o Agropecuario. Hace homenaje al campo colombiano, la riqueza de la tierra, la agricultura y la soberanía alimentaria.'
      }
    ]
  },
  {
    id: 'bandera',
    name: 'Bandera Institucional',
    shortDesc: 'Paño blanco inmaculado con el escudo institucional en el centro.',
    fullMeaning: 'La bandera del SENA se distingue por su fondo blanco, reflejo de la paz, la tranquilidad y la transparencia institucional. En su centro lleva estampado el escudo del SENA, recordando a todos los colombianos que la educación técnica y tecnológica es el cimiento de la convivencia pacífica y el desarrollo productivo del país.',
    elements: [
      {
        name: 'Fondo Blanco',
        significance: 'Simboliza la paz, la pureza de intención, la convivencia armónica, la libertad y la transparencia ética en la formación.'
      },
      {
        name: 'Escudo Central',
        significance: 'Ubicado en el corazón del pabellón, consagra el compromiso del SENA de formar a los ciudadanos de todas las regiones de Colombia.'
      }
    ]
  },
  {
    id: 'logosimbolo',
    name: 'Logosímbolo (El Caminante)',
    shortDesc: 'La figura humana erguida que avanza decidida hacia el futuro.',
    fullMeaning: 'El logosímbolo del SENA muestra a una persona de pie cuyos brazos y piernas forman un camino dinámico. Representa al aprendiz como protagonista de su propio destino: un ciudadano autónomo, crítico y líder que camina con paso firme hacia su autorrealización y la transformación de la sociedad.',
    elements: [
      {
        name: 'La Cabeza (Círculo)',
        significance: 'El conocimiento, la capacidad intelectual, el pensamiento crítico y la formación integral del ser.'
      },
      {
        name: 'El Sendero / Extremidades',
        significance: 'Las líneas convergentes representan los caminos abiertos hacia el desarrollo profesional y las oportunidades que brinda el SENA a todos los estratos de Colombia.'
      },
      {
        name: 'Color Verde SENA (#39A900)',
        significance: 'Color oficial que evoca esperanza, crecimiento continuo, vitalidad, naturaleza colombiana y compromiso con la sostenibilidad.'
      }
    ]
  }
];

export const SENA_HYMN = {
  author: 'Luis Alfredo Sánchez',
  composer: 'Daniel Marlez',
  verses: [
    {
      title: 'Coro',
      lines: [
        'Estudiantes del SENA adelante',
        'por Colombia luchad con amor',
        'con el ánimo noble y radiante',
        'transformemos el mundo en mejor.'
      ]
    },
    {
      title: 'Estrofa I',
      lines: [
        'De la patria el futuro destino,',
        'en las manos del joven está,',
        'el trabajo es seguro camino,',
        'que la paz y el progreso nos da.'
      ]
    },
    {
      title: 'Estrofa II',
      lines: [
        'En la forja del SENA se forman,',
        'hombres libres que saben triunfar,',
        'fuerza y mente en unión se transforman,',
        'para el bien de la patria alcanzar.'
      ]
    },
    {
      title: 'Estrofa III',
      lines: [
        'Hoy la patria nos llama a la lid,',
        'aprendices con fe en el mañana,',
        'con el brazo y la mente servid,',
        'a Colombia que libre reclama.'
      ]
    }
  ]
};

export const SENA_REGULATIONS: RegulationArticle[] = [
  {
    id: 'art-7',
    chapter: 'Capítulo II - Derechos del Aprendiz SENA (Actualizado)',
    articleNum: 'Artículo 7',
    title: 'Derecho a la Formación Profesional Integral y Ambientes Virtuales',
    category: 'Derechos',
    summary: 'Recibir formación de calidad con acceso a plataformas tecnológicas oficiales (Zajuna, LMS, SOFIA Plus) y ambientes presenciales.',
    fullText: 'El aprendiz tiene derecho a recibir formación profesional integral de calidad acorde con su programa, haciendo uso oportuno de las plataformas virtuales institucionales (Zajuna, LMS), laboratorios, bibliotecas y herramientas didácticas, garantizando conectividad e inclusión digital.',
    tags: ['Formación', 'Zajuna', 'Ambientes Virtuales', 'Calidad']
  },
  {
    id: 'art-7-2',
    chapter: 'Capítulo II - Derechos del Aprendiz SENA',
    articleNum: 'Artículo 7 (Numeral 4)',
    title: 'Garantía del Debido Proceso y Presentación de Recursos',
    category: 'Derechos',
    summary: 'Ser escuchado en descargos, aportar pruebas y ejercer derecho de defensa y recursos de reposición ante decisiones del Comité.',
    fullText: 'Ser escuchado formalmente en descargos, contar con garantías procesales plenas ante cualquier medida formativa o proceso disciplinario del Comité de Evaluación y Seguimiento, con derecho a interponer recursos de reposición en los plazos legales establecidos.',
    tags: ['Debido Proceso', 'Descargos', 'Garantías', 'Recursos']
  },
  {
    id: 'art-7-3',
    chapter: 'Capítulo II - Derechos del Aprendiz SENA',
    articleNum: 'Artículo 7 (Numeral 8)',
    title: 'Programas de Bienestar al Aprendiz y Apoyos Socioeconómicos',
    category: 'Derechos',
    summary: 'Participar en convocatorias de salud integral, cultura, deporte, liderazgo y apoyos de sostenimiento regular o FIC.',
    fullText: 'Disfrutar de los programas de Bienestar al Aprendiz orientados al desarrollo humano, salud preventiva, recreación, arte y postularse a convocatorias de apoyos de sostenimiento, alimentación y conectividad según normatividad vigente.',
    tags: ['Bienestar', 'Apoyos de Sostenimiento', 'Salud']
  },
  {
    id: 'art-9',
    chapter: 'Capítulo III - Deberes del Aprendiz SENA',
    articleNum: 'Artículo 9',
    title: 'Identidad Institucional y Uso Responsable de Medios Tecnológicos',
    category: 'Deberes',
    summary: 'Portar el carné en centros presenciales y emplear responsablemente el correo institucional (@misena.edu.co) y plataformas.',
    fullText: 'Portar permanentemente el carné en lugares presenciales y utilizar de manera ética y exclusiva las cuentas de correo institucional (@misena.edu.co), plataformas LMS y Zajuna para fines exclusivamente académicos y formativos.',
    tags: ['Carné', 'Correo Institucional', 'Ciberseguridad']
  },
  {
    id: 'art-9-2',
    chapter: 'Capítulo III - Deberes del Aprendiz SENA',
    articleNum: 'Artículo 9 (Numeral 5)',
    title: 'Puntualidad, Asistencia Sincrónica y Plazo de Justificación',
    category: 'Deberes',
    summary: 'Asistir puntualmente a sesiones presenciales y virtuales sincrónicas; justificar inasistencias en máximo tres (3) días hábiles.',
    fullText: 'Participar puntualmente en todas las actividades presenciales y encuentros sincrónicos programados. En caso de inasistencia por fuerza mayor o incapacidad médica avalada por EPS, presentar la justificación formal dentro de los tres (3) días hábiles siguientes al hecho.',
    tags: ['Asistencia', 'Inasistencias', 'Plazo 3 Días']
  },
  {
    id: 'art-9-3',
    chapter: 'Capítulo III - Deberes del Aprendiz SENA',
    articleNum: 'Artículo 9 (Numeral 9)',
    title: 'Cuidado de Infraestructura, Equipos y Propiedad Intelectual',
    category: 'Deberes',
    summary: 'Preservar los talleres, equipos y respetar las normas de derecho de autor y buenas prácticas en trabajos académicos.',
    fullText: 'Utilizar y cuidar con esmero los equipos, talleres y herramientas institucionales, así como respetar rigurosamente los derechos de autor, evitando el plagio y el uso indebido de herramientas de inteligencia artificial en la presentación de evidencias.',
    tags: ['Equipos', 'Propiedad Intelectual', 'Plagio']
  },
  {
    id: 'art-10',
    chapter: 'Capítulo IV - Prohibiciones',
    articleNum: 'Artículo 10',
    title: 'Prohibiciones Expresas y Faltas contra la Convivencia Digital',
    category: 'Prohibiciones',
    summary: 'Prohibido ingresar bajo efectos de sustancias, portar armas, realizar plagio o incurrir en acoso y ciberbullying.',
    fullText: 'Se prohíbe terminantemente: 1. Ingresar o permanecer bajo efectos de sustancias psicoactivas o alcohol. 2. Portar armas o elementos peligrosos. 3. Falsificar documentos, plagiar proyectos o suplantar identidades en plataformas virtuales. 4. Realizar actos de matoneo, acoso o ciberbullying contra miembros de la comunidad educativa.',
    tags: ['Prohibiciones', 'Sustancias', 'Ciberbullying', 'Plagio']
  },
  {
    id: 'art-22',
    chapter: 'Capítulo VIII - Faltas Académicas y Disciplinarias',
    articleNum: 'Artículo 22 y 23',
    title: 'Clasificación de Faltas (Leves, Graves y Gravísimas)',
    category: 'Faltas y Sanciones',
    summary: 'Calificación de infracciones según el impacto en el proceso formativo, la reincidencia, el dolo y la afectación institucional.',
    fullText: 'Las faltas se tipifican como Académicas (incumplimiento de resultados de aprendizaje) o Disciplinarias (vulneración de deberes de convivencia). Se clasifican en Leves, Graves y Gravísimas considerando el grado de culpabilidad, premeditación, reincidencia y daño social o material.',
    tags: ['Faltas Académicas', 'Faltas Disciplinarias', 'Clasificación']
  },
  {
    id: 'art-28',
    chapter: 'Capítulo IX - Medidas Formativas y Sanciones',
    articleNum: 'Artículo 28',
    title: 'Medidas Formativas de Naturaleza Pedagógica',
    category: 'Faltas y Sanciones',
    summary: 'Llamado de atención verbal reflexivo y Planes de Mejoramiento Académico o Disciplinario concertados.',
    fullText: 'Las medidas formativas son acciones pedagógicas orientadas a encauzar la conducta del aprendiz: 1. Llamado de atención verbal. 2. Plan de mejoramiento académico (actividades de refuerzo evaluables). 3. Plan de mejoramiento disciplinario (estrategias de compromiso ético y de convivencia).',
    tags: ['Medidas Formativas', 'Plan de Mejoramiento', 'Pedagogía']
  },
  {
    id: 'art-29',
    chapter: 'Capítulo IX - Medidas Formativas y Sanciones',
    articleNum: 'Artículo 29',
    title: 'Sanciones Emitidas por la Subdirección de Centro',
    category: 'Faltas y Sanciones',
    summary: 'Llamado de atención escrito con copia a hoja de vida, Condicionamiento de matrícula y Cancelación definitiva de matrícula.',
    fullText: 'Sanciones formales adoptadas por el Subdirector mediante acto administrativo motivado: 1. Llamado de atención escrito. 2. Condicionamiento de matrícula (pérdida temporal de estímulos de bienestar). 3. Cancelación de matrícula (inhabilitación institucional para reingresar de 6 meses hasta 2 años según gravedad).',
    tags: ['Sanciones', 'Condicionamiento', 'Cancelación de Matrícula']
  },
  {
    id: 'art-11',
    chapter: 'Capítulo V - Etapa Productiva',
    articleNum: 'Artículo 11 y 12',
    title: 'Alternativas Vigentes para el Desarrollo de la Etapa Productiva',
    category: 'Etapa Productiva',
    summary: 'Modalidades aprobadas: Contrato de Aprendizaje, Vínculo Laboral, Proyecto Productivo (SENNOVA), Pasantía y Monitoría.',
    fullText: 'Para certificar la etapa productiva, el aprendiz puede elegir entre: 1. Contrato de Aprendizaje (Ley 789 de 2002). 2. Vínculo laboral o contractual en áreas afines. 3. Participación en Proyectos I+D+i, Tecnoparque o SENNOVA. 4. Pasantías institucionales, sociales o comunitarias. 5. Monitorías académicas en el SENA.',
    tags: ['Etapa Productiva', 'Contrato de Aprendizaje', 'SENNOVA', 'Pasantía']
  },
  {
    id: 'art-30',
    chapter: 'Capítulo X - Comité de Evaluación y Seguimiento',
    articleNum: 'Artículo 30',
    title: 'Comité de Evaluación, Due Proceso y Garantías',
    category: 'Comité de Evaluación',
    summary: 'Órgano que evalúa casos especiales garantizando contradicción, defensa, quórum y participación de representantes.',
    fullText: 'El Comité de Evaluación y Seguimiento analiza situaciones académicas o disciplinarias complejas garantizando el debido proceso. Está conformado por coordinación académica, instructores del equipo ejecutor, bienestar al aprendiz y el vocero de los aprendices, emitiendo recomendaciones motivadas al Subdirector.',
    tags: ['Comité de Evaluación', 'Debido Proceso', 'Garantías']
  }
];

export const SENA_QUIZZES: Quiz[] = [
  {
    id: 'quiz-identity',
    title: 'Módulo 1: Identidad y Símbolos SENA',
    description: 'Evalúa tu comprensión sobre la misión, visión, historia y los elementos heráldicos del escudo, la bandera y el himno institucional.',
    badgeName: 'Embajador SENA',
    badgeIcon: 'Award',
    questions: [
      {
        id: 'q1-1',
        question: '¿Qué representa la rueda dentada (piñón) presente en el escudo del SENA?',
        options: [
          'El sector terciario de comercio y servicios',
          'El sector secundario de la industria y la construcción',
          'El sector agrícola y cafetero de Colombia',
          'El sistema virtual de aprendizaje SOFIA Plus'
        ],
        correctIndex: 1,
        explanation: 'La rueda dentada o piñón simboliza el sector secundario (industria y manufactura), reflejando la fuerza técnica y la transformación tecnológica.'
      },
      {
        id: 'q1-2',
        question: '¿Cuál es el significado del color blanco de la bandera institucional del SENA?',
        options: [
          'El color del papel de los títulos técnicos',
          'La neutralidad política y la paz, convivencia y tranquilidad ciudadana',
          'La nieve de los nevados colombianos',
          'El uniforme de cocina y gastronomía'
        ],
        correctIndex: 1,
        explanation: 'El paño blanco representa la paz, la libertad, la transparencia y la convivencia armónica que el SENA fomenta a través de la formación.'
      },
      {
        id: 'q1-3',
        question: 'En el logosímbolo del SENA (conocido como "El Caminante"), ¿qué representan las líneas convergentes inferiores?',
        options: [
          'Las vías férreas de Colombia',
          'Los caminos abiertos hacia el desarrollo profesional y las oportunidades para los aprendices',
          'Las alas de un cóndor andino',
          'Las ramas de un árbol de roble'
        ],
        correctIndex: 1,
        explanation: 'Representan el sendero que recorre el aprendiz para proyectarse con autonomía y liderazgo hacia su futuro laboral y social.'
      },
      {
        id: 'q1-4',
        question: '¿Quién escribió la letra oficial del himno del SENA?',
        options: [
          'Gabriel García Márquez',
          'Daniel Marlez',
          'Luis Alfredo Sánchez',
          'Rodolfo Martínez Tono (fundador del SENA)'
        ],
        correctIndex: 2,
        explanation: 'La letra fue compuesta por Luis Alfredo Sánchez, mientras que la música fue creada por el maestro Daniel Marlez.'
      },
      {
        id: 'q1-5',
        question: '¿Quién fue el fundador visionario del SENA en el año 1957?',
        options: [
          'Rodolfo Martínez Tono',
          'Alberto Lleras Camargo',
          'Guillermo León Valencia',
          'Alfonso López Michelsen'
        ],
        correctIndex: 0,
        explanation: 'El doctor Rodolfo Martínez Tono concibió y fundó el SENA mediante el Decreto Ley 118 del 21 de junio de 1957.'
      }
    ]
  },
  {
    id: 'quiz-regulations',
    title: 'Módulo 2: Reglamento del Aprendiz y Normativa',
    description: 'Pon a prueba tus conocimientos sobre derechos, deberes, prohibiciones, clasificación de faltas y garantías del debido proceso.',
    badgeName: 'Defensor Normativo',
    badgeIcon: 'Scale',
    questions: [
      {
        id: 'q2-1',
        question: 'Si un aprendiz tiene una inasistencia justificada por enfermedad, ¿cuántos días hábiles tiene para presentar su soporte médico certificado?',
        options: [
          'El mismo día antes de medianoche',
          'Máximo tres (3) días hábiles siguientes a la inasistencia',
          'Hasta el final del trimestre formativo',
          'No necesita presentar ninguna justificación'
        ],
        correctIndex: 1,
        explanation: 'El Reglamento del Aprendiz estipula que toda inasistencia debe justificarse con prueba idónea dentro de los tres (3) días hábiles posteriores al hecho.'
      },
      {
        id: 'q2-2',
        question: '¿Cuál de las siguientes acciones constituye una FALTA GRAVÍSIMA según el reglamento?',
        options: [
          'Llegar 5 minutos tarde a una sesión formativa por primera vez',
          'Olvidar el carné en casa un día y tramitar el pase provisional',
          'Portar armas, comercializar sustancias ilícitas o falsificar documentos institucionales',
          'Solicitar cambio de horario por motivos laborales'
        ],
        correctIndex: 2,
        explanation: 'Portar armas, el tráfico o consumo de sustancias psicoactivas o la falsificación/plagio doloso de documentos son faltas gravísimas que conllevan cancelación de matrícula.'
      },
      {
        id: 'q2-3',
        question: '¿Qué es un Plan de Mejoramiento Académico?',
        options: [
          'Una sanción que expulsa al aprendiz del centro',
          'Una medida pedagógica formativa con actividades concertadas para superar deficiencias en resultados de aprendizaje',
          'Una multa económica que se paga en la caja de tesorería',
          'Un examen sorpresa obligatorio sin previo aviso'
        ],
        correctIndex: 1,
        explanation: 'El Plan de Mejoramiento es una medida formativa (no una sanción) que permite al aprendiz concertar actividades para alcanzar los resultados de aprendizaje pendientes.'
      },
      {
        id: 'q2-4',
        question: '¿Quién es la máxima autoridad competente en el Centro de Formación para expedir la sanción de Cancelación de Matrícula?',
        options: [
          'El vigilante de la portería principal',
          'El instructor técnico del ambiente',
          'El Subdirector del Centro de Formación, previo concepto del Comité de Evaluación y Seguimiento',
          'El vocero de la ficha'
        ],
        correctIndex: 2,
        explanation: 'Las sanciones formales (condicionamiento y cancelación) son emitidas únicamente por el Subdirector de Centro mediante acto administrativo motivado.'
      },
      {
        id: 'q2-5',
        question: '¿Qué derecho tiene el aprendiz cuando es citado a un Comité de Evaluación y Seguimiento?',
        options: [
          'Derecho a negarse a asistir sin justificación',
          'Derecho a ser escuchado en descargos, aportar pruebas y presentar recurso de reposición (debido proceso)',
          'No tiene derecho a hablar durante la sesión',
          'Aceptar automáticamente cualquier sanción sin ser notificado'
        ],
        correctIndex: 1,
        explanation: 'El aprendiz goza de la garantía constitucional del Debido Proceso: notificación formal, derecho a rendir descargos, aportar evidencias y apelar la decisión.'
      }
    ]
  },
  {
    id: 'quiz-stages',
    title: 'Módulo 3: Etapas de Formación y Bienestar',
    description: 'Comprueba qué tanto sabes sobre la etapa lectiva, la etapa productiva (contrato de aprendizaje, pasantías) y los beneficios de bienestar.',
    badgeName: 'Líder Integral',
    badgeIcon: 'Compass',
    questions: [
      {
        id: 'q3-1',
        question: '¿Cuál de las siguientes es una alternativa válida contemplada para el desarrollo de la Etapa Productiva?',
        options: [
          'Ver videos en internet en casa sin tutor',
          'Contrato de Aprendizaje, Vínculo Laboral, Proyecto Productivo I+D, Pasantía o Monitoría',
          'Trabajar informalmente sin relación con el programa',
          'Asistir a paseos recreativos con amigos'
        ],
        correctIndex: 1,
        explanation: 'El SENA reconoce formalmente Contrato de Aprendizaje, Vínculo laboral, Proyecto Productivo (Tecnoparque/Sennova), Pasantía comunitaria/pública y Monitorías institucionales.'
      },
      {
        id: 'q3-2',
        question: 'Durante la etapa lectiva con Contrato de Aprendizaje, ¿cuál es el porcentaje mínimo legal del apoyo de sostenimiento?',
        options: [
          '20% del salario mínimo legal',
          '50% del salario mínimo mensual legal vigente (SMMLV) + afiliación a EPS',
          '100% del salario mínimo más prestaciones completas',
          'El SENA no permite apoyo de sostenimiento en etapa lectiva'
        ],
        correctIndex: 1,
        explanation: 'Según la Ley 789 de 2002, en etapa lectiva el patrocinador aporta como mínimo el 50% del SMMLV y cotización a EPS; en etapa productiva asciende al 75% o 100% (según tasa de desempleo) más ARL.'
      },
      {
        id: 'q3-3',
        question: '¿Qué servicio NO forma parte del portafolio de Bienestar al Aprendiz?',
        options: [
          'Actividades deportivas, torneos y acondicionamiento físico',
          'Orientación y apoyo psicosocial confidencial',
          'Cobro de matrículas mensuales obligatorias a los aprendices',
          'Convocatorias a apoyos de sostenimiento e incentivos de excelencia'
        ],
        correctIndex: 2,
        explanation: '¡El SENA es 100% gratuito y no cobra jamás matrículas ni mensualidades! Bienestar brinda deportes, cultura, salud, psicología y apoyos socioeconómicos sin costo.'
      },
      {
        id: 'q3-4',
        question: '¿Qué rol cumple el "Vocero de Ficha" elegido en cada grupo?',
        options: [
          'Es el jefe que califica a sus compañeros',
          'Es el líder representante democrático que canaliza inquietudes y propuestas del grupo ante instructores y coordinación',
          'Es el encargado de hacer el aseo de todos los talleres',
          'Es el único que puede hablar con el Subdirector'
        ],
        correctIndex: 1,
        explanation: 'El Vocero de Ficha es un líder estudiantil elegido por sus compañeros para representarlos, articular el trabajo en equipo y participar en comités formativos.'
      },
      {
        id: 'q3-5',
        question: '¿Qué es el Fondo Emprender del SENA?',
        options: [
          'Un préstamo con altos intereses bancarios',
          'Un fondo de capital semilla no reembolsable creado para financiar iniciativas empresariales de aprendices y colombianos',
          'Una tienda de venta de uniformes del SENA',
          'Un banco privado internacional'
        ],
        correctIndex: 1,
        explanation: 'Fondo Emprender es el fondo de capital semilla del Gobierno Nacional adscrito al SENA que entrega recursos de capital condonable a proyectos innovadores.'
      }
    ]
  }
];

export const SENA_ETHICAL_CASES: EthicalCase[] = [
  {
    id: 'caso-1',
    title: 'Caso A: Plagio de Código en Proyecto Formativo',
    scenario: 'El aprendiz Camilo entrega la evidencia final de desarrollo de software copiando textualmente el repositorio de un colega del año anterior, sin citar la autoría y afirmando que fue desarrollo 100% propio. El instructor detecta la copia idéntica.',
    category: 'Académica',
    gravity: 'Grave',
    involvedActor: 'Aprendiz Camilo (Ficha ADSO)',
    options: [
      {
        id: 'c1-opt1',
        action: 'Ignorar el plagio y ponerle nota de aprobación para no perjudicar la estadística de la ficha.',
        isCorrect: false,
        feedback: 'Inadecuado: El plagio vulnera la ética formativa, los derechos de autor y el reglamento institucional. Desconocerlo fomenta la deshonestidad.',
        regulationReference: 'Art. 10 y Art. 22: El fraude y la apropiación indebida de propiedad intelectual son faltas graves que merecen proceso formativo.'
      },
      {
        id: 'c1-opt2',
        action: 'Remitir al Comité de Evaluación solicitando Plan de Mejoramiento Disciplinario y Académico con compromiso ético y reevaluación sustentada.',
        isCorrect: true,
        feedback: '¡Excelente decisión! Aplica el debido proceso pedagógico: se convoca al comité para escuchar los descargos de Camilo, se califica la falta grave con atenuantes si reconoce el hecho, y se impone un plan de mejoramiento con trabajo pedagógico sobre ética profesional.',
        regulationReference: 'Art. 28 y Art. 30: Medida formativa con llamado de atención por escrito y plan de mejoramiento ético-académico.'
      },
      {
        id: 'c1-opt3',
        action: 'Expulsarlo inmediatamente de las instalaciones policialmente sin darle derecho a hablar.',
        isCorrect: false,
        feedback: 'Inadecuado: Vulnera el derecho fundamental al Debido Proceso (Art. 7 numeral 4) y la presunción de inocencia; toda medida requiere audiencia de descargos.',
        regulationReference: 'Art. 7 numeral 4: Derecho irrenunciable al debido proceso y legítima defensa.'
      }
    ]
  },
  {
    id: 'caso-2',
    title: 'Caso B: Inasistencia Continua sin Soporte Oportuno',
    scenario: 'La aprendiz Marcela dejó de asistir a clases presenciales durante 4 días hábiles consecutivos sin comunicarse con su vocero ni instructores. Al quinto día regresa manifestando que tuvo un problema familiar pero no cuenta con soporte formal.',
    category: 'Disciplinaria',
    gravity: 'Grave',
    involvedActor: 'Aprendiz Marcela (Ficha Gestión Empresarial)',
    options: [
      {
        id: 'c2-opt1',
        action: 'Notificar citación a descargos para verificar las circunstancias de fuerza mayor y orientarla con Bienestar antes de determinar deserción.',
        isCorrect: true,
        feedback: '¡Correcto! Más de 3 días injustificados puede configurar inicio de trámite de deserción, pero el SENA prioriza la permanencia escolar. Se le debe citar para escuchar su situación psicosocial o de fuerza mayor y activar la ruta de Bienestar.',
        regulationReference: 'Art. 22 y Procedimiento de Deserción: Garantía de descargos para justificar motivos de fuerza mayor antes del acto definitivo.'
      },
      {
        id: 'c2-opt2',
        action: 'Expedir inmediatamente resolución de cancelación de matrícula sin notificación previa.',
        isCorrect: false,
        feedback: 'Incorrecto: La resolución sin previa notificación por correo o cartelera vulnera el procedimiento de deserción que exige 5 días para presentar descargos.',
        regulationReference: 'Reglamento Art. 22: El trámite de deserción exige requerimiento previo por escrito.'
      },
      {
        id: 'c2-opt3',
        action: 'Permitirle que siga asistiendo sin solicitarle ningún compromiso ni justificación.',
        isCorrect: false,
        feedback: 'Incorrecto: Desestimar el ausentismo afecta la disciplina colectiva y desprotege la responsabilidad del centro sobre la custodia del aprendiz.',
        regulationReference: 'Art. 9 Numeral 5: Deber de puntualidad y justificación formal de inasistencias.'
      }
    ]
  },
  {
    id: 'caso-3',
    title: 'Caso C: Daño Accidental de Equipo en Taller Práctico',
    scenario: 'Durante una práctica en el laboratorio de electrónica, Juan conectó accidentalmente un voltímetro con la polaridad invertida en alto voltaje, quemando el fusible interno. Juan dio aviso inmediato al instructor con sinceridad y colaboró en el reporte técnico.',
    category: 'Disciplinaria',
    gravity: 'Leve',
    involvedActor: 'Aprendiz Juan (Ficha Mantenimiento Electrónico)',
    options: [
      {
        id: 'c3-opt1',
        action: 'Agradecer la honestidad inmediata de Juan, realizar retroalimentación pedagógica de seguridad eléctrica y coordinar la reposición del fusible con el taller.',
        isCorrect: true,
        feedback: '¡Decisión pedagógica ejemplar! No existió dolo ni negligencia temeraria, sino un error de práctica reportado transparentemente. El aprendizaje técnico fomenta el reporte de seguridad sin temor al castigo injusto.',
        regulationReference: 'Art. 24: Criterios de atenuación: Confesión sincera, ausencia de dolo y resarcimiento oportuno del daño.'
      },
      {
        id: 'c3-opt2',
        action: 'Sancionarlo con expulsión y demandarlo penalmente por daño a bien del Estado.',
        isCorrect: false,
        feedback: 'Completamente desproporcionado: Se trataba de un error formativo sin intención dañina. Castigarlo severamente desestimularía que los aprendices reporten fallas en talleres.',
        regulationReference: 'Principios de Proporcionalidad y Razonabilidad del Reglamento del Aprendiz.'
      }
    ]
  }
];

export const INDUCTION_CHECKLIST_ITEMS = [
  { id: 'chk-1', title: 'Registro y validación de datos en SOFIA Plus', desc: 'Verificar documento de identidad, dirección y teléfono de contacto actualizados.', phase: 'Semana 1' },
  { id: 'chk-2', title: 'Creación y acceso al correo @misena.edu.co', desc: 'Activar tu cuenta institucional oficial para recibir comunicaciones de la cohorte.', phase: 'Semana 1' },
  { id: 'chk-3', title: 'Ingreso al LMS Zajuna y familiarización del entorno', desc: 'Explorar el espacio virtual de tu ficha, anuncios y foros de inducción.', phase: 'Semana 1' },
  { id: 'chk-4', title: 'Lectura y comprensión del Reglamento del Aprendiz (Acuerdo 007)', desc: 'Conocer derechos, deberes, prohibiciones y el debido proceso institucional.', phase: 'Semana 1' },
  { id: 'chk-5', title: 'Firma digital del Acta de Compromiso del Aprendiz SENA', desc: 'Comprometerte formalmente con la formación profesional integral y la ética.', phase: 'Semana 1' },
  { id: 'chk-6', title: 'Recorrido por ambientes, talleres y ruta de evacuación del Centro', desc: 'Identificar laboratorios, enfermería, biblioteca y puntos de encuentro seguro.', phase: 'Semana 2' },
  { id: 'chk-7', title: 'Taller de Inducción con el Equipo de Bienestar al Aprendiz', desc: 'Conocer apoyos socioeconómicos, servicios de salud, deportes, cultura y liderazgo.', phase: 'Semana 2' },
  { id: 'chk-8', title: 'Jornada democrática de elección de Vocero de Ficha', desc: 'Participar activamente en la postulación y votación de tu líder de grupo.', phase: 'Semana 2' },
  { id: 'chk-9', title: 'Socialización del Proyecto Formativo y Resultados de Aprendizaje', desc: 'Conocer las fases del proyecto (Análisis, Planeación, Ejecución, Evaluación).', phase: 'Semana 2' },
  { id: 'chk-10', title: 'Presentación de alternativas de Etapa Productiva', desc: 'Aprender cómo registrarse en la plataforma SGVA para contratos de aprendizaje.', phase: 'Semana 2' }
];

export const MOCK_APPRENTICES: Apprentice[] = [
  {
    id: 'app-1',
    name: 'Sebastián Morales Duque',
    document: '1.036.789.412',
    email: 'smorales412@misena.edu.co',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2824910',
    regional: 'Regional Antioquia',
    centro: 'Centro de Formación en Tecnologías de la Información',
    modulesCompleted: {
      identity: true,
      regulations: true,
      stages: true,
      ethicsCase: true
    },
    quizScores: {
      identity: 100,
      regulations: 95,
      stages: 90
    },
    casesResolved: 3,
    checklistCompletedIds: ['chk-1', 'chk-2', 'chk-3', 'chk-4', 'chk-5', 'chk-6', 'chk-7', 'chk-8', 'chk-9', 'chk-10'],
    lastActive: 'Hoy, 09:15 AM',
    status: 'Completado',
    certificateIssuedAt: '10 de Noviembre de 2026'
  },
  {
    id: 'app-2',
    name: 'Valentina Restrepo Cárdenas',
    document: '1.017.654.890',
    email: 'vrestrepo890@misena.edu.co',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2824910',
    regional: 'Regional Antioquia',
    centro: 'Centro de Formación en Tecnologías de la Información',
    modulesCompleted: {
      identity: true,
      regulations: true,
      stages: false,
      ethicsCase: true
    },
    quizScores: {
      identity: 90,
      regulations: 85,
      stages: 0
    },
    casesResolved: 2,
    checklistCompletedIds: ['chk-1', 'chk-2', 'chk-3', 'chk-4', 'chk-5', 'chk-6'],
    lastActive: 'Ayer, 04:30 PM',
    status: 'En Progreso'
  },
  {
    id: 'app-3',
    name: 'Andrés Felipe Gómez Meza',
    document: '1.020.445.671',
    email: 'afgomez671@misena.edu.co',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2824910',
    regional: 'Regional Antioquia',
    centro: 'Centro de Formación en Tecnologías de la Información',
    modulesCompleted: {
      identity: true,
      regulations: false,
      stages: false,
      ethicsCase: false
    },
    quizScores: {
      identity: 80,
      regulations: 0,
      stages: 0
    },
    casesResolved: 1,
    checklistCompletedIds: ['chk-1', 'chk-2'],
    lastActive: 'Hace 3 días',
    status: 'Rezagado'
  },
  {
    id: 'app-4',
    name: 'Mariana Caicedo Osorio',
    document: '1.001.382.903',
    email: 'mcaicedo903@misena.edu.co',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2824910',
    regional: 'Regional Antioquia',
    centro: 'Centro de Formación en Tecnologías de la Información',
    modulesCompleted: {
      identity: true,
      regulations: true,
      stages: true,
      ethicsCase: true
    },
    quizScores: {
      identity: 100,
      regulations: 100,
      stages: 95
    },
    casesResolved: 3,
    checklistCompletedIds: ['chk-1', 'chk-2', 'chk-3', 'chk-4', 'chk-5', 'chk-6', 'chk-7', 'chk-8', 'chk-9', 'chk-10'],
    lastActive: 'Hoy, 08:40 AM',
    status: 'Completado',
    certificateIssuedAt: '10 de Noviembre de 2026'
  },
  {
    id: 'app-5',
    name: 'Brayan Estiven Mosquera',
    document: '1.039.221.785',
    email: 'bemosquera785@misena.edu.co',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    ficha: '2824910',
    regional: 'Regional Antioquia',
    centro: 'Centro de Formación en Tecnologías de la Información',
    modulesCompleted: {
      identity: true,
      regulations: true,
      stages: false,
      ethicsCase: false
    },
    quizScores: {
      identity: 85,
      regulations: 75,
      stages: 0
    },
    casesResolved: 1,
    checklistCompletedIds: ['chk-1', 'chk-2', 'chk-3', 'chk-4', 'chk-5'],
    lastActive: 'Hoy, 07:10 AM',
    status: 'En Progreso'
  },
  {
    id: 'app-6',
    name: 'Daniela Sofía Vargas',
    document: '1.028.910.334',
    email: 'dsvargas334@misena.edu.co',
    program: 'Tecnólogo en Gestión Contable y Financiera',
    ficha: '2718302',
    regional: 'Regional Distrito Capital',
    centro: 'Centro de Servicios Financieros',
    modulesCompleted: {
      identity: true,
      regulations: true,
      stages: true,
      ethicsCase: true
    },
    quizScores: {
      identity: 95,
      regulations: 90,
      stages: 100
    },
    casesResolved: 3,
    checklistCompletedIds: ['chk-1', 'chk-2', 'chk-3', 'chk-4', 'chk-5', 'chk-6', 'chk-7', 'chk-8', 'chk-9', 'chk-10'],
    lastActive: 'Hoy, 10:20 AM',
    status: 'Completado',
    certificateIssuedAt: '10 de Noviembre de 2026'
  }
];

export const DESIGNATED_INSTRUCTOR: InstructorProfile = {
  id: 'inst-1',
  name: 'Ing. Patricia Helena Ramírez Duque',
  title: 'Instructora Técnica Líder & Coordinadora de Inducción',
  email: 'phramirez@sena.edu.co',
  document: '43.892.104',
  centro: 'Centro de Formación en Tecnologías de la Información y las Comunicaciones',
  regional: 'Regional Antioquia',
  fichasAsignadas: ['2824910', '2718302'],
  roleDescription: 'Docente y autoridad pedagógica única encargada de supervisar el progreso de inducción, auditar las evaluaciones del reglamento, dictaminar sobre los casos éticos y avalar los certificados finales de los aprendices.'
};
