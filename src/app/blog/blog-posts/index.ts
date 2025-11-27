export interface Blog {
  id?: number;
  title: string;
  slug: string;
  description?: string;
  src: string[];
  date: string;
}

export const blogs = [
  {
    title:
      'Коли можна подати заяву на призначення пенсії за віком та який строк для подання додаткових документів',
    slug: 'koly-mozhna-podaty-zaiavu-na-pryznachennia-pensii-za-vikom-ta-iakyi-strok-dlia-podannia-dodatkovykh-dokumentiv',
    src: ['https://www.youtube.com/embed/B7iPkYXihNo'],
    date: '2025-11-25',
    description:
      'Пенсію призначають з дня після досягнення пенсійного віку, якщо звернутися протягом 3 місяців. Можна подати заяву за місяць до народження. На донесення документів — 3 місяці без втрати дати звернення.',
  },
  {
    title: 'Як зараховується період навчання до пільгового стажу',
    slug: 'iak-zarakhovuietsia-period-navchannia-do-pilhovoho-stazhu',
    src: [
      'https://www.youtube.com/embed/l5FD7qL55pI',
      'https://www.youtube.com/embed/sXhNRT6hW8g',
    ],
    date: '2025-09-17',
    description:
      'Навчання у ПТУ, технікумі чи коледжі зараховується до пільгового стажу, якщо перерва до працевлаштування за фахом не перевищує 3 місяці. Строкова служба теж враховується. Судова практика на боці громадян.',
  },
  {
    title: 'Щодо зарахування періодів УБД, АТО, ООС',
    slug: 'shchodo-zarakhuvannia-periodiv-ubd-ato-oos',
    src: ['https://www.youtube.com/embed/Y3Knuv9Rnew'],
    date: '2025-06-30',
    description:
      'Пояснюємо, як підтвердити страховий стаж без трудової книжки.',
  },
  {
    title:
      'Чи можна призначити пенсію в Україні громадянам, які тимчасово проживають за кордоном?',
    slug: 'chy-mozhna-pryznachyty-pensiiu-v-ukraini-hromadianam-iaki-tymchasovo-prozhyvaiut-za-kordonom',
    src: ['https://www.youtube.com/embed/vzNE33MOCRQ'],
    date: '2025-06-06',
    description:
      'Можливість призначення та виплати пенсії громадянам України, які тимчасово проживають за кордоном. Порядок КМУ № 299 від 2025 року, фізична ідентифікація та дистанційне оформлення.',
  },
  {
    title:
      'Чи можна зарахувати періоди роботи у пільговий стаж, якщо на підприємстві не проводили атестацію робочих місць?',
    slug: 'chy-mozhna-zarakhovaty-periody-roboty-u-pilhovyi-stazh-iakscho-na-pidpryiemstvi-ne-provodyly-atestatsiiu-robochykh-mists',
    src: ['https://www.youtube.com/embed/RCXMYLuGQIg'],
    date: '2025-06-05',
    description:
      'Позиція Верховного Суду щодо зарахування пільгового стажу за Списками № 1 і № 2 у випадках, коли підприємство не проводило атестацію робочих місць. Відповідальність власника.',
  },
  {
    title:
      'Як зараховується пільговий стаж, якщо підприємство знаходиться на окупованій території або в районі бойових дій?',
    slug: 'iak-zarakhovuietsia-pilhovyi-stazh-iakscho-pidpryiemstvo-znakhodytsia-na-okupovanii-terytorii-abo-v-raioni-boiovykh-dii',
    src: ['https://www.youtube.com/embed/7WgdT5M7pf0'],
    date: '2025-05-29',
    description:
      'Підтвердження пільгового стажу за Списками № 1 і № 2 для підприємств на окупованих територіях та в районах бойових дій. Порядок зарахування за даними Реєстру застрахованих осіб.',
  },
  {
    title:
      'Чи можна збільшити розмір пенсії, перейшовши з пільгової пенсії за Списком № 1 або № 2 на звичайну пенсію за віком у 60 років із застосуванням нової середньої заробітної плати?',
    slug: 'chy-mozhna-zbilshyty-rozmir-pensii-pereishovshi-z-pilhovoi-pensii-za-spyskom-1-abo-2-na-zvychainu-pensiiu-za-vikom-u-60-rokiv-iz-zastosuvanniam-novoi-serednoi-zarobitnoi-platy',
    src: ['https://www.youtube.com/embed/Y0P1U9ZrxEs'],
    date: '2025-05-26',
    description:
      'Позиція Верховного Суду щодо неможливості переходу з пільгової пенсії за Списком № 1 або № 2 на звичайну пенсію за віком у 60 років із застосуванням нової середньої заробітної плати.',
  },
  {
    title:
      'Як зараховуються періоди роботи за Списком № 1 до страхового стажу?',
    slug: 'iak-zarakhovuiutsia-periody-roboty-za-spyskom-1-do-strakhovoho-stazhu',
    src: ['https://www.youtube.com/embed/3D_e94DujX8'],
    date: '2025-05-25',
    description:
      'Механізм додаткового зарахування стажу для працівників, зайнятих на роботах із особливо шкідливими умовами праці за Списком №1. Умови та вплив на розмір пенсії.',
  },
  {
    title:
      'Чому Пенсійний фонд не зараховує періоди участі в бойових діях у кратному обчисленні (1:3) до стажу при призначенні пенсії?',
    slug: 'chomu-pensiinyi-fond-ne-zarakhovuie-periody-uchasti-v-boiovykh-diiakh-u-kratnomu-obchyslenni-1-3-do-stazhu-pry-pryznachenni-pensii',
    src: ['https://www.youtube.com/embed/TA2zRdFmmzo'],
    date: '2025-05-20',
    description:
      'Причини відмов Пенсійного фонду в зарахуванні періодів участі в бойових діях у кратному обчисленні 1:3 до стажу. Законодавство, судова практика та шляхи вирішення.',
  },
  {
    title:
      "Чи зараховується військова служба до загального стажу та пільгового (спецстажу)? Роз'яснення законодавства",
    slug: 'chy-zarakhovuietsia-viiskova-sluzhba-do-zahalnoho-stazhu-ta-pilhovoho-spetsstazhu-roziasnennia-zakonodavstva',
    src: ['https://www.youtube.com/embed/hguLxkUkz3M'],
    date: '2025-05-19',
    description:
      "Роз'яснення законодавства щодо зарахування військової служби до страхового та пільгового стажу. Умови, обмеження та особливості для військовослужбовців.",
  },
  {
    title:
      'Пенсія на пільгових умовах за Списком №2 для жінок: порівняння законів №1788-XII та №1058-IV',
    slug: 'pensiia-na-pilhovykh-umovakh-za-spyskom-2-dlia-zhinok-porivniannia-zakoniv-1788-xii-ta-1058-iv',
    src: ['https://www.youtube.com/embed/uveQDWzq1_Y'],
    date: '2025-05-17',
    description:
      'Порівняння законів №1788-XII та №1058-IV щодо призначення пільгової пенсії за Списком №2 для жінок. Умови, відмінності та судова практика.',
  },
  {
    title:
      'Пенсія на пільгових умовах за Списком №2 для чоловіків: порівняльний аналіз законів №1788-XII та №1058-IV',
    slug: 'pensiia-na-pilhovykh-umovakh-za-spyskom-2-dlia-cholovikiv-porivnialnyi-analiz-zakoniv-1788-xii-ta-1058-iv',
    src: ['https://www.youtube.com/embed/lKspLHJQgh4'],
    date: '2025-05-16',
    description:
      'Порівняльний аналіз законів №1788-XII та №1058-IV щодо призначення пільгової пенсії за Списком №2 для чоловіків. Умови, відмінності та судова практика.',
  },
  {
    title:
      'Пенсія на пільгових умовах за Списком №1 для жінок: порівняльний аналіз законів №1788-XII та №1058-IV',
    slug: 'pensiia-na-pilhovykh-umovakh-za-spyskom-1-dlia-zhinok-porivnialnyi-analiz-zakoniv-1788-xii-ta-1058-iv',
    src: ['https://www.youtube.com/embed/5Qt2pz5duXk'],
    date: '2025-05-15',
    description:
      'Порівняльний аналіз законів №1788-XII та №1058-IV для призначення пільгової пенсії жінкам за Списком №1. Вимоги до стажу, вік виходу та судова практика.',
  },
  {
    title:
      'Пенсія на пільгових умовах за Списком №1 для чоловіків: порівняльний аналіз законів №1788-XII та №1058-IV',
    slug: 'pensiia-na-pilhovykh-umovakh-za-spyskom-1-dlia-cholovikiv-porivnialnyi-analiz-zakoniv-1788-xii-ta-1058-iv',
    src: ['https://www.youtube.com/embed/kKqYkOchkPc'],
    date: '2025-05-14',
    description:
      'Порівняльний аналіз законів №1788-XII та №1058-IV для призначення пільгової пенсії чоловікам за Списком №1. Вімоги до стажу, вік виходу та судова практика.',
  },
  {
    title:
      'Пільгова пенсія водіям міського пасажирського транспорту (автобусів, тролейбусів, трамваїв) і великовагових автомобілів',
    slug: 'pilhova-pensiia-vodiiam-miskoho-pasazhyrskoho-transportu-avtobusiv-trolejbusiv-tramvaiv-i-velykovahovykh-avtomobiliv',
    src: ['https://www.youtube.com/embed/mC1MOIZWPA8'],
    date: '2025-05-12',
    description:
      'Умови призначення пільгової пенсії водіям автобусів, тролейбусів і трамваїв. Порівняння законодавства, вимоги до стажу та судова практика.',
  },
  {
    title:
      'Пільгова пенсія для жінок, які працюють доярками, операторами машинного доїння або свинарками',
    slug: 'pilhova-pensiia-dlia-zhinok-iaki-pratsiuiut-doiarkamy-operatoramy-mashynnoho-doinnia-abo-svynarkamy',
    src: ['https://www.youtube.com/embed/4l1bpf4RCtQ'],
    date: '2025-05-08',
    description:
      'Пенсія для доярок і свинарок: до 2015 року — з 50 років при 20 роках стажу, після 2015 — з 55 років. Рішення КСУ 2020 відновило старі норми, але ПФУ не застосовує без суду. Норми обслуговування КМУ не затверджені.',
  },
  {
    title:
      'Пільгова пенсія для трактористів-машиністів, безпосередньо зайнятих у виробництві сільськогосподарської продукції',
    slug: 'pilhova-pensiia-dlia-traktorystiv-mashynistiv-bezposeredno-zainiatykh-u-vyrobnytstvi-silskohospodarskoi-produktsii',
    src: ['https://www.youtube.com/embed/4Wf0J5HoMIw'],
    date: '2025-05-05',
    description:
      'Пенсія для трактористів-машиністів з 55 років: до 2015 року — 25 років стажу (20 пільгового), після 2015 — 30 років (20 пільгового). Рішення КСУ 2020 року відновило старі норми, але ПФУ їх не застосовує без суду.',
  },
  {
    title: 'Як зараховується період навчання до страхового стажу',
    slug: 'iak-zarakhovuietsia-period-navchannia-do-strakhovoho-stazhu',
    src: ['https://www.youtube.com/embed/KVWTJGFFbkc'],
    date: '2025-05-03',
    description:
      'Період навчання до 2004 року на денній формі зараховується до страхового стажу без внесків. Після 2004 року — лише при сплаті ЄСВ. Незакінчене навчання теж враховується при наявності довідки.',
  },
  {
    title:
      'Призначення пільгової пенсії незалежно від віку для працівників гірничої та металургійної галузей',
    slug: 'pryznachennia-pilhovoi-pensii-nezalezhno-vid-viku-dlia-pratsivnykiv-hirnychoi-ta-metalurhiinoi-haluzei',
    src: [
      'https://www.youtube.com/embed/xpv3CTVfPvo',
      'https://www.youtube.com/embed/CPXH6CQt5Bg',
    ],
    date: '2025-04-30',
    description:
      'Пільгова пенсія незалежно від віку для працівників гірничих та металургійних виробництв: 25 років стажу для загальних професій, 20 років для провідних. Зниження віку на 1 рік за кожен рік роботи.',
  },
  {
    title: 'Необхідний страховий стаж для призначення пенсії за віком',
    slug: 'neobkhidnyi-strakhovyi-stazh-dlia-pryznachennia-pensii-za-vikom',
    src: ['https://www.youtube.com/embed/mJLpN3urFNc'],
    date: '2025-04-29',
    description:
      'Вимоги до страхового стажу для пенсії за віком у 2025-2028 роках: 32-35 років для виходу у 60, 22-25 років для 63 років, 15 років для 65. З 2028 року — пенсія незалежно від віку при 40 роках стажу.',
  },
  {
    title:
      'Хто має право на отримання грошової допомоги у розмірі десяти місячних пенсій',
    slug: 'khto-maie-pravo-na-otrymannia-hroshovoi-dopomohy-u-rozmiri-desiaty-misiachnykh-pensii',
    src: ['https://www.youtube.com/embed/wr8ExnqfFyE'],
    date: '2025-04-28',
    description:
      "Працівники освіти, охорони здоров'я, культури та соцзахисту можуть отримати грошову допомогу у розмірі 10 місячних пенсій. Умови: 30-35 років стажу, робота на пенсійний вік, жодної попередньої пенсії.",
  },
  {
    title:
      'Пенсія незалежно від віку з 1 січня 2028 року за наявності 40 років страхового стажу',
    slug: 'pensiia-nezalezhno-vid-viku-z-1-sichnia-2028-roku-za-naiavnosti-40-rokiv-strakhovoho-stazhu',
    src: ['https://www.youtube.com/embed/K3dfq-4SE7Y'],
    date: '2025-04-27',
    description:
      'З 1 січня 2028 року пенсію можна оформити незалежно від віку при наявності 40 років страхового стажу. Як підготуватися та перевірити свій стаж вже зараз.',
  },
  {
    title:
      'Робота в медичних закладах, яка зараховується до стажу у подвійному розмірі: що потрібно знати після 2004 року',
    slug: 'robota-v-medychnykh-zakladakh-iaka-zarakhovuietsia-do-stazhu-u-podviinomu-rozmiri-shcho-potribno-znaty-pislia-2004-roku',
    src: ['https://www.youtube.com/embed/m3ir28bMeug'],
    date: '2025-04-26',
    description:
      'Робота в інфекційних, реанімаційних, психіатричних та патологоанатомічних відділеннях зараховується до стажу у подвійному розмірі навіть після 2004 року. Як оскаржити відмову ПФУ.',
  },
  {
    title:
      'Неправильна індексація пенсій, призначених з 2020 року: що змінила постанова Великої Палати ВС і як діяти пенсіонеру',
    slug: 'nepravylna-indeksatsiia-pensii-pryznachenykh-z-2020-roku-shcho-zminyla-postanova-velykoi-palaty-vs-i-iak-diati-pensioneru',
    src: [],
    date: '2025-04-25',
    description:
      'Чому Велика Палата ВС визнала незаконною фіксовану доплату 100–135 грн, які помилки допустив ПФУ та як крок за кроком добитися правильного перерахунку пенсії.',
  },
  {
    title:
      'Дострокова пенсія жінкам, які працюють у сільському господарстві та виховали п’ятьох і більше дітей',
    slug: 'dostrokova-pensiia-zhinkam-iaki-pratsiuiut-u-silskomu-hospodarstvi-ta-vykhovaly-piatokh-i-bilshe-ditei',
    src: ['https://www.youtube.com/embed/3ytTENHF1xg'],
    date: '2025-04-25',
    description:
      'Як скористатися пунктом 7 ч. 2 ст. 114 Закону №1058-IV: які умови, документи та підтвердження працевлаштування потрібні аграрним матерям п’ятьох дітей.',
  },
  {
    title:
      'Особливості призначення пенсії матері особи з інвалідністю з дитинства та тяжко хворих дітей',
    slug: 'osoblyvosti-pryznachennia-pensii-materi-osoby-z-invalidnistiu-z-dytynstva-ta-tiazhko-khvorikh-ditei',
    src: ['https://www.youtube.com/embed/Rutujf0I5oQ'],
    date: '2025-04-24',
    description:
      'Дострокова пенсія матері дитини з інвалідністю або тяжко хворої: вимоги 50 років, 15 років стажу, медичні докази та строки звернення.',
  },
  {
    title:
      'Дострокове призначення пенсії для осіб з інвалідністю внаслідок захисту Батьківщини',
    slug: 'dostrokove-pryznachennia-pensii-dlia-osib-z-invalidnistiu-vnaslidok-zakhystu-batkivshchyny',
    src: ['https://www.youtube.com/embed/26y0Thp3jRQ'],
    date: '2025-04-22',
    description:
      'Дострокова пенсія для осіб з інвалідністю внаслідок захисту Батьківщини: умови статті 115 Закону №1058-IV, страховий стаж та перелік обов’язкових документів.',
  },
  {
    title:
      'Право батька на дострокове призначення пенсії у разі виховання п’ятьох дітей або дитини з інвалідністю',
    slug: 'pravo-batka-na-dostrokove-pryznachennia-pensii-u-razi-vykhovannia-piatokh-ditei-abo-dytyny-z-invalidnistiu',
    src: ['https://www.youtube.com/embed/RCpPnUp2S3I'],
    date: '2025-04-21',
    description:
      'Як батькові отримати дострокову пенсію за виховання п’ятьох дітей або дитини з інвалідністю: умови статті 115 Закону №1058-IV, необхідний стаж і підтвердні документи.',
  },
  {
    title:
      'Право жінок, які народили та виховали п’ятьох дітей, на дострокове призначення пенсії',
    slug: 'pravo-zhinok-yaki-narodyly-ta-vykhovaly-piatokh-ditei-na-dostrokove-pryznachennia-pensii',
    src: ['https://www.youtube.com/embed/FJfuO3tlFhA'],
    date: '2025-04-20',
    description:
      'Право багатодітних матерів на дострокову пенсію за п. 3 ч. 1 ст. 115 Закону №1058-IV: умови, зарахування догляду до стажу та перелік документів.',
  },
  {
    title:
      'Дострокове призначення пенсії для дружин, чоловіків та батьків загиблих військовослужбовців',
    slug: 'dostrokove-pryznachennia-pensii-dlia-druzhyn-cholovikiv-ta-batkiv-zahyblykh-viiskovosluzhbovtsiv',
    src: ['https://www.youtube.com/embed/1wFY8VGEdfo'],
    date: '2025-04-19',
    description:
      'Дострокова пенсія для родин загиблих військовослужбовців: умови статті 115 Закону №1058-IV, страховий стаж та необхідні документи.',
  },
  {
    title: 'Яка максимальна пенсія у 2025 році?',
    slug: 'yaka-maksymalna-pensiia-u-2025',
    src: ['https://www.youtube.com/embed/FZBqCZjdqjU'],
    date: '2025-04-18',
  },
  {
    title: 'Які вимоги до призначення пенсії за Списком №2?',
    slug: 'yaki-vymohy-do-pryznachennia-pensii-za-spyskom-2',
    src: ['https://www.youtube.com/embed/98MWMHpSnb0'],
    date: '2025-04-14',
    description:
      'Які вимоги до призначення пенсії за Списком №2: чинні редакції переліку, необхідний стаж для жінок і чоловіків та зменшення пенсійного віку.',
  },
  {
    title:
      'Право учасників бойових дій, АТО та ООС на дострокове призначення пенсії',
    slug: 'pravo-uchasnykiv-boiovykh-dii-ato-ta-oos-na-dostrokove-pryznachennia-pensii',
    src: ['https://www.youtube.com/embed/7MAm1gh6wKk'],
    date: '2025-04-12',
    description:
      'Право учасників бойових дій, АТО та ООС на дострокову пенсію: необхідний стаж, стаття 115 Закону №1058-IV та поширені відмови Пенсійного фонду.',
  },
  {
    title: 'Що таке Список №1?',
    slug: 'shcho-take-spysok-1',
    src: ['https://www.youtube.com/embed/9pS1349TKfU'],
    date: '2025-04-11',
    description:
      'Що таке Список №1, хто його затверджує та які пенсійні пільги і додатковий стаж отримують працівники в особливо шкідливих умовах.',
  },
  {
    title: 'Пенсія для чоловіків, які працювали за Списком №1',
    slug: 'pensiia-dlia-cholovikiv-iaki-pratsiuvaly-za-spyskom-1',
    src: ['https://www.youtube.com/embed/6tAtB1YBlYA'],
    date: '2025-04-10',
    description:
      'Чоловіки, які працювали за Списком №1, мають право на пільгову пенсію за віком за наявності 20 років загального стажу та роботи в особливо шкідливих умовах.',
  },
  {
    title: 'Як зараховується стаж, набутий у російській федерації?',
    slug: 'yak-zarakhovuietsia-stazh-nabutyi-u-rosiiskiy-federatsii',
    src: ['https://www.youtube.com/embed/ZcfOD4OclCQ'],
    date: '2025-04-09',
    description:
      'Питання зарахування стажу, набутого у російській федерації, залишається актуальним і потребує судового захисту після припинення міжнародних угод.',
  },
  {
    title: 'Пенсія для жінок, які працювали за Списком №1',
    slug: 'pensiia-dlia-zhinok-iaki-pratsiuvaly-za-spyskom-1',
    src: ['https://www.youtube.com/embed/yZaNonC6KVk'],
    date: '2025-04-08',
    description:
      'Пенсія для жінок за Списком №1: умови виходу у 45 років, необхідний стаж, пільги та оскарження відмови Пенсійного фонду.',
  },
  {
    title:
      'Що робити, якщо Пенсійний фонд не зараховує періоди роботи до страхового стажу?',
    slug: 'shcho-robyty-iakshcho-pensiinyi-fond-ne-zarakhovuie-periody-roboty-do-strakhovoho-stazhu',
    src: ['https://www.youtube.com/embed/c7yRYB4Ifcw'],
    date: '2025-04-05',
    description:
      'Що робити, якщо ПФУ не зарахував стаж: довідки, архіви, свідки та судовий порядок підтвердження періодів роботи, навчання і служби.',
  },
  {
    title: 'Як підвищити пенсію за вислугу років?',
    slug: 'yak-pidvyshchyty-pensiiu-za-vysluhu-rokiv',
    src: ['https://www.youtube.com/embed/xXDsl9snBQ0'],
    date: '2025-04-04',
    description:
      'Як підвищити пенсію за вислугу років: коли переходити на пенсію за віком і як через суд домогтися нового показника середньої зарплати.',
  },
  {
    title:
      'Вимоги призначення пенсії за вислугу років для працівників освіти, охорони здоров’я та соціального забезпечення',
    slug: 'vymohy-pryznachennia-pensii-za-vysluhu-rokiv-dlia-pratsivnykiv-osvity-okhorony-zdorovia-ta-sotsialnoho-zabezpechennia',
    src: ['https://www.youtube.com/embed/5Z2OLDdanUc'],
    date: '2025-04-03',
  },
  {
    title: 'Хто має право на пенсію за віком у 2025 році?',
    slug: 'khto-maie-pravo-na-pensiiu-za-vikom-u-2025',
    src: ['https://www.youtube.com/embed/ZwtT8Ddv12c'],
    date: '2025-04-02',
  },
  {
    title: 'Мінімальний розмір пенсії за віком: умови та особливості',
    slug: 'minimalnyi-rozmir-pensii-za-vikom-umovy-osoblyvosti',
    src: ['https://www.youtube.com/embed/52AMmLjUiFk'],
    date: '2025-04-01',
  },
  {
    title: 'Кому перерахують пенсію з 1 квітня 2025 року?',
    slug: 'komu-pererakhuiut-pensii-1-kvitnia-2025',
    src: ['https://www.youtube.com/embed/6-P2rTCcoUY'],
    date: '2025-03-28',
  },
];
