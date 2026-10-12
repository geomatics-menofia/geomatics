/* تبديل اللغة عربي / English: بيترجم الواجهة الأساسية، والباقي بيفضل عربي لحد ما يتضاف */
(()=>{
const RT=document.documentElement;
const EN={
'الكل':'All','فيها عملي':'With practical','نظري فقط':'Theory only','الرئيسية':'Home','المواد':'Subjects','الكتب':'Books','الدكاترة':'Doctors','الجروبات':'Groups','الأدوات':'Tools','الجدول':'Schedule',
'جيوماتكس':'Geomatics','كلية الآداب':'Faculty of Arts','جامعة المنوفية':'Menoufia University',
'نقيس.':'We measure.','نحلّل.':'We analyze.','نرسم المستقبل.':'We map the future.',
'منصة الدفعة: المواد والكتب والدكاترة وملخصات الطلبة، وأدوات مساحة وخرائط بتشتغل من الموبايل.':'The batch platform: subjects, books, doctors, student summaries, plus surveying and mapping tools that work on your phone.',
'ابدأ المذاكرة':'Start studying','الفهرس':'Contents','كل حاجة في الموقع، من هنا لهناك.':'Everything on the site, from here to there.',
'مواد الفصل الأول بدكاترتها وملخصات زمايلك.':"First-semester subjects with their doctors and your classmates' summaries.",
'كتاب لكل مادة، اقرأه أونلاين أو حمّله.':'A book for every subject: read it online or download it.',
'هيئة التدريس والمعيدين ومقرراتهم.':'Faculty, teaching assistants and their courses.',
'إحداثيات ومسافات ومساحات وحاسبة معدل وعدّاد امتحان.':'Coordinates, distances, areas, a GPA calculator and an exam countdown.',
'مواعيد المحاضرات والمدرجات والمجموعات لكل يوم.':'Lecture times, halls and groups for every day.',
'الجروبات والروابط':'Groups & Links','جروبات واتساب وقنوات تيليجرام وبوابة الطالب في مكان واحد.':'WhatsApp groups, Telegram channels and the student portal in one place.',
'لو مش عاجبك شكل الموقع':"Don't like the look?",'ثيمات وألوان وحجم خط وحواف، على مزاجك بالظبط.':'Themes, colors, font size and corners, just the way you like.',
'عن المنصة':'About','مين ورا الموقع وإزاي تساهم فيه.':'Who is behind the site and how to contribute.','قريباً':'Soon',
'الكتاب':'Book','المحاضرات والملفات':'Lectures & Files','المدرّسون':'Instructors','المطوّر':'Developer','جدول المحاضرات':'Lecture Schedule',
'ملخصات الطلبة':'Student Summaries','هيئة التدريس':'Faculty','أسئلة شائعة':'FAQ','إزاي تساهم؟':'How to contribute?',
'الفصل الأول 2026/2027، المستوى الأول. الطالب يختار مقرراً اختيارياً واحداً.':'First semester 2026/2027, Level 1. Students pick one elective course.',
'مفيش نتائج مطابقة.':'No matching results.','ابحث باسم المادة أو الكود أو الدكتور':'Search by subject, code or doctor','ابحث باسم المادة أو الكود':'Search by subject or code',
'الكتاب لسه مترفعش، بيتضاف قريب':'The book has not been uploaded yet, coming soon','الكتاب لسه مترفعش للمادة دي، بيتضاف قريب':'The book for this subject has not been uploaded yet, coming soon',
'دكاترة ومعيدين الفصل الأول ومقرراتهم.':'First-semester doctors, teaching assistants and their courses.',
'الوصف تعريفي عام، والمحتوى الرسمي في توصيف المقرر من الكلية.':"The description is a general overview; the official content is in the college's course specification.",
'الفصل الأول 2026/2027، المستوى الأول (الأسبوع الثاني). الجدول عرضة للتغيير، راجع إعلانات الكلية.':'First semester 2026/2027, Level 1 (week 2). The schedule may change, check the college announcements.',
'الجروبات دي مبادرة طلابية. المواعيد والقرارات الرسمية بتتاخد من إعلانات الكلية.':'These groups are a student initiative. Official schedules and decisions come from the college announcements.',
'برنامج الجيوماتكس، كلية الآداب، جامعة المنوفية. مبادرة طلابية وليست موقعاً رسمياً للكلية.':'Geomatics Program, Faculty of Arts, Menoufia University. A student initiative, not an official college website.',
'صُنع بواسطة':'Made by','لائحة القسم':'Department regulations','أحمد':'Ahmed','تخطَّ للمحتوى':'Skip to content','الشمال':'North',
'القائمة':'Menu','تبديل الوضع بين الليلي والنهاري':'Switch between dark and light mode','ليلي / نهاري':'Dark / Light','جيوماتكس، الرئيسية':'Geomatics, Home',
'تغيير اللغة':'Change language','English / عربي':'English / عربي','كرة أرضية تفاعلية':'Interactive globe','اضغط لتحديث موقعك':'Click to refresh your location',
'السبت':'Saturday','الأحد':'Sunday','الاثنين':'Monday','الإثنين':'Monday','الثلاثاء':'Tuesday','الأربعاء':'Wednesday','الخميس':'Thursday','الجمعة':'Friday',
'الجغرافيا الطبيعية':'Physical Geography','مبادئ المساحة والخرائط':'Principles of Surveying & Mapping','الجغرافيا البشرية':'Human Geography',
'مقدمة في نظم المعلومات الجغرافية':'Introduction to GIS','الجغرافيا الاقتصادية':'Economic Geography','قضايا جغرافية معاصرة':'Contemporary Geographic Issues',
'جغرافية الصناعة':'Industrial Geography','مدخل إلى الجودة والاعتماد':'Introduction to Quality & Accreditation',
'تدرس ظاهرات سطح الأرض الطبيعية من مناخ وتضاريس ومياه وتربة ونبات طبيعي، وكيف تتفاعل معاً.':"Studies the Earth's natural surface phenomena (climate, landforms, water, soil and natural vegetation) and how they interact.",
'أساسيات قياس الأرض وتمثيلها على الخرائط، مع جانب عملي في المعمل.':'Fundamentals of measuring the Earth and representing it on maps, with a practical lab component.',
'تدرس الإنسان وعلاقته بالمكان: السكان والعمران والأنشطة البشرية وتوزيعها.':'Studies people and their relationship to place: population, settlement and human activities and their distribution.',
'مدخل لنظم المعلومات الجغرافية (GIS): جمع البيانات المكانية وتحليلها وعرضها على الخرائط، مع تطبيق عملي.':'An introduction to Geographic Information Systems (GIS): collecting, analyzing and displaying spatial data on maps, with hands-on practice.',
'تدرس توزيع الأنشطة الاقتصادية من زراعة وصناعة وتجارة وخدمات وعلاقتها بالموارد والمكان.':'Studies the distribution of economic activities (agriculture, industry, trade and services) and their relation to resources and place.',
'قراءة جغرافية لقضايا معاصرة تهم العالم والمجتمع.':'A geographic reading of contemporary issues that concern the world and society.',
'تدرس توطّن الصناعة وعوامل نموها وتوزيعها الجغرافي.':'Studies industrial location, the factors behind its growth and its geographic distribution.',
'مقرر جامعي عام عن مفاهيم الجودة والاعتماد الأكاديمي في مؤسسات التعليم. يدرّسه رئيس القسم.':'A general university course on quality and academic accreditation concepts in educational institutions. Taught by the department head.'
};
Object.assign(EN,{
'طالب بالقسم':'Department student','أستاذ مساعد':'Associate Professor','أستاذ':'Professor','مدرس':'Lecturer','الهيئة المعاونة':'Teaching assistants','إيميل':'Email',
'كتاب':'Book','فهرس الموقع':'Site contents','اقرأ':'Read','تحميل':'Download','صفحة المادة':'Subject page',
'كتاب لكل مادة من مواد الفصل الأول: اقرأه أونلاين أو حمّله على موبايلك.':'A book for every first-semester subject: read it online or download it to your phone.',
'المتاح دلوقتي':'Available now:','والباقي بيتضاف أول بأول.':'and the rest are added as they arrive.','الكتب بتتضاف أول بأول، فخليك قريب.':'Books are added as they arrive, so stay tuned.',
'المتاح':'Available','(عملي)':'(practical)','كل المواد':'All subjects','جروب المادة':'Subject group','كل الكتب':'All books',
'لسه مفيش محاضرات للمادة دي.':'No lectures for this subject yet.','جاري التحميل...':'Loading...','ارفع ملخص (صورة أو PDF)':'Upload a summary (image or PDF)',
'عنوان الملخص، مثلاً: محاضرة 2':'Summary title, e.g. Lecture 2','اسمك (اختياري)':'Your name (optional)',
'الملخص بيظهر بعد مراجعة المسؤول، والحد الأقصى 50MB.':'The summary appears after admin review. Max size 50MB.',
'الربط بقاعدة البيانات غير مفعّل.':'Database connection is not enabled.','الربط بقاعدة البيانات غير مفعّل بعد.':'Database connection is not enabled yet.',
'تعذّر تحميل الملخصات، جرّب بعد شوية.':'Could not load the summaries, try again in a bit.','لسه مفيش ملخصات للمادة دي. كن أول من يرفع!':'No summaries for this subject yet. Be the first to upload!',
'اختار ملف الأول':'Choose a file first','صور (JPG/PNG/WEBP) أو PDF بس':'Images (JPG/PNG/WEBP) or PDF only','الملف أكبر من 50MB':'The file is larger than 50MB',
'جاري الرفع...':'Uploading...','حصلت مشكلة، جرّب تاني':'Something went wrong, try again','تم الرفع! هيظهر بعد مراجعة المسؤول':'Uploaded! It will appear after admin review',
'حاسبة المعدل':'GPA Calculator','عدّاد الامتحان':'Exam Countdown','الحسابات كلها بتتم على جهازك، ومفيش حاجة بتتبعت لأي مكان.':'All calculations happen on your device, nothing is sent anywhere.',
'الأداة السابقة':'Previous tool','الأداة التالية':'Next tool','اسحب البكرة يمين وشمال، أو استخدم الأسهم. ملهاش آخر':'Drag the reel left and right, or use the arrows. It never ends',
'اختار تقدير كل مادة وعدّل الساعات لو لزم. المقياس شائع، راجع لائحة الكلية للتأكد.':'Pick a grade for each subject and adjust the hours if needed. The scale is a common one, check the college regulations to be sure.',
'ساعات':'Hours','تقدير':'Grade','اختار تقديراتك':'Pick your grades','اكتب اسم الامتحان وتاريخه، والموعد بيتحفظ على جهازك.':'Enter the exam name and date; it is saved on your device.',
'اسم الامتحان':'Exam name','مثلاً: ميد جيو101':'e.g. Geo101 Midterm','التاريخ':'Date','حفظ الموعد':'Save date','حدد موعد أقرب امتحان':'Set your nearest exam date',
'المعدل:':'GPA:','من 4 عن':'out of 4 over','ساعة':'hours','ممتاز! كمّل كده':'Excellent! Keep it up','جيد جداً، قريب من القمة':'Very good, close to the top',
'كويس، ومعاك فرصة تعلّي':'Good, and you have room to improve','لسه قدامك وقت، ركّز في الجاي':'You still have time, focus on what is next','جه الموعد، بالتوفيق!':'The day has come, good luck!',
'فاضل':'remaining','يوم و':'days and','ساعة و':'hours and','دقيقة':'minutes','يوم':'day','الامتحان':'The exam',
'الأخضر الأصلي':'Original Green','الكلاسيك اللي اتعمل عليه الموقع، ومحدش اشتكى (لسه)':'The classic the site was built on, and nobody has complained (yet)',
'محيط':'Ocean','عشان تغرق في المذاكرة بستايل':'To drown in studying in style','غروب':'Sunset','لو الامتحان قرّب، اتفرج على الغروب شوية':'If the exam is near, watch the sunset for a bit',
'صحرا':'Desert','سيناء من غير تذكرة قطر':'Sinai without a train ticket','نيون':'Neon','لسهران الفجر وعينه متحمّلة':'For those up until dawn whose eyes can take it',
'وردي':'Pink','مين قال إن الجيوماتكس مش لطيف؟':'Who said Geomatics is not cute?','قهوة':'Coffee','المذاكرة من غيرها غير شرعية':'Studying without it is illegal',
'أبيض وأسود':'Black & White','للجادين بس. ممنوع الهزار':'For the serious only. No jokes','الموقع هيمشي على مزاج جهازك.':"The site will follow your device's mood.",
'للسهر، وللعيون التعبانة.':'For late nights and tired eyes.','للشجعان بس. ويا ريت بالنهار.':'For the brave only. Preferably in daytime.','خط صغير... عينك زي النسر؟':'Small text... eyes like an eagle?',
'الوضع الطبيعي، زي ما ربنا خلقه.':'The normal mode, just as nature intended.','للي نسي النضارة في العربية':'For those who left their glasses in the car',
'حواف حادة، شكلك جاد في الشغل.':'Sharp corners, you look serious about work.','متوازن، زي حياتك (المفروض).':'Balanced, like your life (supposedly).','دايرية ومدلّعة، كإنها بتحضنك.':'Round and pampered, like a hug.',
'طب كان من الأول! اتفضل غيّره على مزاجك. الموقع هيفتكر اختيارك المرة الجاية، ومش هنعاتبك... كتير.':"Well, why not earlier! Go ahead and change it your way. The site will remember your choice next time, and we won't blame you... much.",
'اختار لونك':'Pick your color','الاختيار بيتطبق فوراً على الصفحة كلها، وعلى الكرة الأرضية والنقط اللي في الخلفية كمان.':'The choice applies instantly to the whole page, including the globe and the background dots.',
'الإضاءة':'Lighting','تلقائي':'Auto','ليلي':'Dark','نهاري':'Light','حجم الكلام':'Text size','صغير':'Small','عادي':'Normal','كبير':'Large','الحواف':'Corners','حاد':'Sharp','دائري':'Round','الحركة':'Motion',
'الخلفية المتحركة':'Animated background','الشبكة والنقط اللي ورا الصفحة. اقفلها لو موبايلك بيسخن.':'The network and dots behind the page. Turn it off if your phone heats up.',
'الأنيميشن':'Animations','كل الحركات والتأثيرات. اقفلها لو دماغك بتلف.':'All motion and effects. Turn it off if your head is spinning.','معاينة سريعة':'Quick preview',
'نقيس. نحلّل. نرسم.':'We measure. We analyze. We map.','مختار':'Selected','زرار أساسي':'Primary button','زرار عادي':'Normal button','المسافة:':'Distance:','السمت:':'Azimuth:',
'اختارلي أنا':'Surprise me','رجّعني زي ما كنت':'Reset to how it was','لسه مش عاجبك؟ جرّب تقفل الموقع وتفتحه تاني... مش هيفرق بس هتحس بتحسن.':"Still not happy? Try closing and reopening the site... it won't change anything but you may feel better.",
'انضم':'Join','مدرج':'Hall','مجموعة':'Group','الجدول PDF':'Schedule PDF','صورة الجدول':'Schedule image',
'هل الموقع رسمي؟':'Is the site official?','لا، دي مبادرة طلابية مستقلة. المواعيد والقرارات الرسمية بتتاخد من إعلانات الكلية.':'No, this is an independent student initiative. Official schedules and decisions come from the college announcements.',
'إزاي أرفع ملخص؟':'How do I upload a summary?','ادخل على صفحة المادة، اكتب عنوان الملخص، واختار صورة أو PDF لحد 50MB. بيظهر بعد المراجعة.':'Open the subject page, enter the summary title and choose an image or PDF up to 50MB. It appears after review.',
'ليه ملخصي ما ظهرش؟':"Why didn't my summary appear?",'كل ملخص بيتراجع يدوياً قبل النشر، فممكن ياخد شوية وقت.':'Every summary is reviewed manually before publishing, so it may take a while.',
'فين كتب المواد؟':'Where are the subject books?','في قسم الكتب، وكمان في صفحة كل مادة. الكتب بتتضاف أول بأول، والمادة اللي كتابها لسه مجاش بتظهر':'In the Books section and on each subject page. Books are added as they arrive, and a subject whose book has not arrived yet shows',
'قريباً':'Soon','مش عاجبني شكل الموقع، أعمل إيه؟':"I don't like how the site looks, what do I do?",'ادخل على':'Go to','وغيّر الألوان والإضاءة وحجم الخط والحواف زي ما تحب.':'and change the colors, lighting, font size and corners however you like.',
'الأدوات دقيقة؟':'Are the tools accurate?','بتستخدم صيغ قياسية (زي هافرساين لحساب المسافة على سطح الأرض)، ومناسبة للدراسة والتقدير. للأعمال الهندسية الرسمية استخدم أجهزة وبرامج معتمدة.':"They use standard formulas (such as haversine for distances on the Earth's surface) and suit study and estimation. For official engineering work use certified instruments and software.",
'منصة مجانية بتجمع مواد برنامج الجيوماتكس وكتبها ودكاترتها وملخصات الطلبة، وبتقدّم أدوات مساحة وخرائط مفيدة لأي طالب أو مهتم.':"A free platform that brings together the Geomatics program's subjects, books, doctors and student summaries, and offers surveying and mapping tools useful to any student or enthusiast.",
'مجانية':'Free','من غير اشتراك ولا تسجيل.':'No subscription or sign-up.','بجهود الطلبة':'Student-powered','الملخصات بيرفعها زمايلك وبتتراجع قبل النشر.':'Summaries are uploaded by your classmates and reviewed before publishing.',
'كتب المواد':'Subject books','كتاب لكل مادة، تقراه أونلاين أو تحمّله.':'A book for every subject, read it online or download it.','أدوات حقيقية':'Real tools','حسابات إحداثيات ومساحة بتفيدك في الدراسة والشغل.':'Coordinate and area calculations that help in study and work.',
'صوّر':'Capture','لخّص المحاضرة وصوّر الكراسة أو اعملها PDF.':'Summarize the lecture and photograph your notebook, or make it a PDF.','ارفع':'Upload','افتح صفحة المادة وارفع الملف بعنوان واضح.':'Open the subject page and upload the file with a clear title.',
'شارك':'Share','بعد المراجعة بيظهر لكل الدفعة، وابعت الرابط لزمايلك.':'After review it shows for the whole batch, so send the link to your classmates.',
'طالب بالفرقة الأولى، برنامج الجيوماتكس. عندك فكرة أو عايز تساهم في التطوير؟ كلمني.':'A first-year student in the Geomatics program. Have an idea or want to help develop it? Talk to me.',
'حقوق (ج)':'Law (G)','محاضرة الفصل الأول: مفهوم الجغرافيا البشرية ومجالاتها':'Chapter 1 lecture: the concept of human geography and its fields','محاضرات نظم المعلومات الجغرافية':'GIS lectures',
'سكشن العمل الأول: تدريبات ArcGIS':'First lab section: ArcGIS exercises','الفصل الخامس':'Chapter 5','الأسايمنت: أسئلة مقالية للفصول الخمسة':'Assignment: essay questions for the five chapters',
'جروبات المقررات':'Course groups','جروب لكل مقرر من مقررات الفصل الأول 2026/2027.':'A group for each first-semester 2026/2027 course.','الفصل الأول 2026/2027':'First semester 2026/2027','الفصل الأول':'First semester',
'الدفعة والسكاشن':'Batch & Sections','جروبات الدفعة والعملي وكلية الآداب.':'Groups for the batch, practical sections and the Faculty of Arts.','الدفعة (فرقة أولى جيوماتكس)':'The batch (Geomatics, first year)',
'الجروب العام للدفعة':'General batch group','سكشن مبادئ المساحة والخرائط':'Principles of Surveying & Mapping section','جروب العملي':'Practical group','جروب عام لطلاب الكلية':'General group for college students',
'التربية الوطنية والعسكرية':'National & Military Education','قنوات تيليجرام للمتطلبات.':'Telegram channels for the requirements.','التربية الوطنية (بنات)':'National Education (girls)','قناة تيليجرام':'Telegram channel','التربية العسكرية (أولاد)':'Military Education (boys)',
'روابط مهمة':'Important links','الروابط الرسمية لكلية الآداب وجامعة المنوفية.':'Official links for the Faculty of Arts and Menoufia University.','برنامج ابن الهيثم':'Ibn Al-Haytham Program','للاستفادة من خدمات البرنامج.':"To benefit from the program's services.",
'منصة التعلم الإلكتروني':'E-Learning Platform','الدخول على منصة التعلم.':'Log in to the learning platform.','الدفع الإلكتروني':'Electronic Payment','سداد الرسوم والمصروفات.':'Pay fees and expenses.',
'الصفحة الرسمية لكلية الآداب':'Official Faculty of Arts page','متابعة أخبار الكلية وفعالياتها (فيسبوك).':'Follow college news and events (Facebook).','القناة الرسمية لطلاب كلية الآداب':'Official channel for Faculty of Arts students',
'الاستفسارات وآخر المستجدات (تيليجرام).':'Inquiries and latest updates (Telegram).','صفحة الإرشاد الأكاديمي':'Academic Advising page','الاستفسارات والإرشاد الأكاديمي وتوجيه الطلاب (فيسبوك).':'Inquiries, academic advising and student guidance (Facebook).',
'لائحة القسم: المقررات الدراسية':'Department regulations: Courses','المقررات الإجبارية والاختيارية والمعدل التراكمي.':'Compulsory and elective courses and the cumulative GPA.','جدول المحاضرات (الأسبوع الثاني)':'Lecture schedule (week 2)',
'ملف الجدول الرسمي لبرنامج الجيوماتكس.':'The official schedule file of the Geomatics program.',
'تحويل الإحداثيات':'Coordinate Converter','درجات عشرية ⇄ درجات ودقائق وثواني. الجنوب والغرب بإشارة سالبة.':'Decimal degrees ⇄ degrees, minutes and seconds. South and West use a negative sign.',
'درجات عشرية':'Decimal degrees','دقائق':'Minutes','ثواني':'Seconds','أدخل قيمة':'Enter a value','المسافة والاتجاه':'Distance & Bearing',
'المسافة على سطح الأرض والسمت بين نقطتين (الإحداثيات بالدرجات العشرية).':"Distance on the Earth's surface and the azimuth between two points (coordinates in decimal degrees).",
'عرض النقطة 1':'Point 1 latitude','طول النقطة 1':'Point 1 longitude','عرض النقطة 2':'Point 2 latitude','طول النقطة 2':'Point 2 longitude','أدخل الإحداثيات الأربعة':'Enter all four coordinates',
'شمال شرق':'North-east','جنوب شرق':'South-east','جنوب غرب':'South-west','شمال غرب':'North-west','شمال':'North','شرق':'East','جنوب':'South','غرب':'West','كم':'km','ناحية':'toward',
'مقياس الرسم':'Map Scale','امسح الخانة اللي عايز تحسبها وسيب الباقي.':'Clear the field you want to calculate and leave the rest.','المقياس 1 :':'Scale 1 :','المسافة على الخريطة (سم)':'Map distance (cm)',
'المسافة على الأرض (م)':'Ground distance (m)','أدخل خانتين على الأقل':'Enter at least two fields','المقياس 1:':'Scale 1:','على الخريطة =':'on the map =','على الأرض (':'on the ground (',
'مساحة مضلع بالإحداثيات':'Polygon Area by Coordinates','طريقة الإحداثيات (Shoelace). اكتب نقطة في كل سطر: X ثم Y بالمتر، بمسافة بينهم.':'Coordinate (Shoelace) method. Enter one point per line: X then Y in meters, separated by a space.',
'النقاط':'Points','محتاج 3 نقاط على الأقل':'You need at least 3 points','عدد النقاط:':'Number of points:','المساحة:':'Area:','م²':'m²','فدان':'feddan','هكتار':'hectare','المحيط:':'Perimeter:',
'وحدات المساحة المصرية':'Egyptian Area Units','الفدان = 4200.833 م²، والفدان 24 قيراط، والقيراط 24 سهم.':'1 feddan = 4200.833 m², a feddan is 24 qirat, and a qirat is 24 sahm.',
'القيمة':'Value','الوحدة':'Unit','متر مربع':'Square meter','قيراط':'qirat','سهم':'sahm','بالصيغة المصرية:':'In Egyptian format:','فدان و':'feddan and','قيراط و':'qirat and',
'تقصد أنهي مادة':'Which subject do you mean','حسب جدول الأسبوع الثاني، راجع إعلانات الكلية.':'According to the week 2 schedule, check the college announcements.','محاضرات':'Lectures',
'مفيش محاضرات يوم':'No lectures on','في الجدول الحالي':'in the current schedule','افتح جدول المحاضرات كامل':'Open the full lecture schedule','أو اسألني عن مادة معينة أو يوم، مثلاً:':'Or ask me about a specific subject or day, for example:',
'محاضرة المساحة امتى؟':'When is the surveying lecture?','جدول الأحد':'Sunday schedule','مش موجودة في الجدول الحالي.':'is not in the current schedule.','جدول الأسبوع الثاني،':'Week 2 schedule,','الجدول كامل':'Full schedule',
'كل الدكاترة والمعيدين':'All doctors and teaching assistants','، أو اسأل عن مادة:':', or ask about a subject:','أو اسأل عن مادة:':'Or ask about a subject:','مين دكتور المساحة؟':'Who is the surveying doctor?',
'رئيس القسم:':'Department head:','بيدرّس':'teaches','رئيس القسم':'Department head','جروبات واتساب لكل مادة، والدفعة، والسكاشن:':'WhatsApp groups for each subject, the batch and the sections:','افتح صفحة الجروبات':'Open the groups page',
'جروب الجودة':'Quality group',': لسه مفيش جروب ليها،':': no group yet,','شوف باقي الجروبات':'See the other groups','الكتاب لسه مترفعش، بس فيه:':'The book has not been uploaded yet, but there is:','لسه مفيش ملفات ليها.':'No files yet.',
'صفحة المادة (فيها ملخصات الطلبة)':'Subject page (with student summaries)','احسب معدلك بسهولة من':'Calculate your GPA easily from the','صفحة الأدوات':'Tools page','من اللائحة:':'From the regulations:','• الإجباري':'• Compulsory:',
'120 ساعة (40 مادة)':'120 hours (40 subjects)','ولازم تتسجل وتنجح فيها.':'and you must register for and pass them.','• الاختياري: تختار':'• Elective: you choose','8 مواد من 24':'8 subjects out of 24',
'، ومعاهم مادتين متطلب كلية من 4 (التنمية البشرية، دراسة الجدوى، إدارة الأزمات، مهارات التواصل).':', plus 2 faculty-requirement courses out of 4 (Human Development, Feasibility Study, Crisis Management, Communication Skills).',
'• مادتين متطلب جامعة (قضايا مجتمعية، مدخل إلى الجودة) ومش بتتحسب في الساعات.':'• 2 university-requirement courses (Societal Issues, Introduction to Quality) which are not counted in the hours.',
'افتح ملف اللائحة':'Open the regulations file','لرفع ملخص: افتح صفحة المادة، اكتب عنوان الملخص، واختار صورة أو PDF لحد 50MB. بيظهر بعد مراجعة المسؤول.':'To upload a summary: open the subject page, enter the summary title and choose an image or PDF up to 50MB. It appears after admin review.',
'المطوّر:':'Developer:','كلمني على واتساب':'Message me on WhatsApp','الأدوات:':'Tools:','وحاسبة المعدل وعدّاد الامتحان.':'and the GPA calculator and exam countdown.','افتح الأدوات':'Open the tools',
'غيّر الألوان والإضاءة وحجم الخط من':'Change the colors, lighting and font size from the','صفحة المظهر':'Appearance page','. ولو الموبايل بطيء، اقفل':'. And if your phone is slow, turn off','من هناك.':'from there.',
'مواد الفصل الأول (':'First-semester subjects (','الجروب':'Group','جدول النهاردة':"Today's schedule",'جروبات المواد':'Subject groups','اللائحة والمقررات':'Regulations & courses','كتب ومحاضرات':'Books & lectures','تواصل مع المطوّر':'Contact the developer',
'اكتب سؤالك وأنا أرد فوراً 🙂':'Type your question and I will answer right away 🙂','العفو! لو احتجت أي حاجة تانية أنا هنا 🙌':"You're welcome! If you need anything else I'm here 🙌",
'أهلاً بيك! 👋 أنا مساعد جيوماتكس. اسألني عن الجدول أو المواد أو الدكاترة أو الجروبات أو الكتب.':"Welcome! 👋 I'm the Geomatics assistant. Ask me about the schedule, subjects, doctors, groups or books.",
'أنا مساعد الموقع، بجاوب فوراً من بيانات المنصة:':"I'm the site assistant, I answer instantly from the platform's data:",'مواعيد المحاضرات والمدرجات':'Lecture times and halls','الدكاترة والمعيدين':'Doctors and teaching assistants',
'جروبات واتساب وتيليجرام':'WhatsApp and Telegram groups','الكتب والمحاضرات والأسايمنت':'Books, lectures and assignments','اللائحة وروابط الجامعة':'Regulations and university links',
'مش متأكد إني فهمت 🤔 جرّب سؤال من دول:':"I'm not sure I understood 🤔 Try one of these:",'المواد:':'Subjects:','الجدول (الأسبوع الثاني):':'Schedule (week 2):','🤖 رد ذكاء اصطناعي، راجع الإعلانات الرسمية للتأكيد.':'🤖 AI reply, check the official announcements to confirm.',
'رد ذكاء اصطناعي، راجع الإعلانات الرسمية للتأكيد.':'AI reply, check the official announcements to confirm.','افتح مساعد جيوماتكس':'Open the Geomatics assistant','بفكّر…':'Thinking…','مساعد جيوماتكس':'Geomatics Assistant','إغلاق':'Close',
'اسألني: محاضرة المساحة امتى؟':'Ask me: When is the surveying lecture?','اكتب سؤالك':'Type your question','إرسال':'Send','أهلاً! 👋 أنا مساعد جيوماتكس. اسألني عن':"Hi! 👋 I'm the Geomatics assistant. Ask me about",'وهرد فوراً.':'and I will reply right away.',
'عن':'about','من':'of','نظري':'theory','عملي':'practical','مواد':'subjects','أسماء':'names','أدوات':'tools','أيام':'days','رابط':'links','الكل':'All','فيها عملي':'With practical','نظري فقط':'Theory only',
'تذكير':'Reminder','هيئة التدريس والمعيدون في برنامج الجيوماتكس ومقرراتهم.':'Faculty and teaching assistants in the Geomatics program and their courses.'
});
Object.assign(EN,{'واتساب':'WhatsApp','محاضر':'Lecturer','رفع':'Upload','تيليجرام':'Telegram','فيسبوك':'Facebook','لينكدإن':'LinkedIn','جيت هب':'GitHub','منصة طلاب برنامج الجيوماتكس':'Geomatics Program Students Platform','أدوات المساحة والخرائط':'Surveying & Mapping Tools','المساحة والخرائط':'Surveying & Mapping','م':'m','سم':'cm','درجات':'degrees','درجة':'degree','أو':'or','نظم المعلومات الجغرافية':'Geographic Information Systems','English / عربي':'العربية / English'});
const NM=[['أ.م.د/ ','Assoc. Prof. '],['أ.د/ ','Prof. '],['د/ ','Dr. '],['أ/ ','T.A. '],['عواد حامد','Awad Hamed'],['أماني الإمام','Amani El-Imam'],['إيمان عصام','Eman Essam'],['صبحي رمضان','Sobhy Ramadan'],['عاطف حافظ سلامة','Atef Hafez Salama'],['وجدي وجيه','Wagdy Wageeh'],['عادل شاويش','Adel Shawish'],['يوسف السيد محمد','Youssef El-Sayed Mohamed'],['أماني المنشاوي','Amani El-Menshawy'],['موسى فتحي','Mousa Fathy'],['مدرج ','Hall '],['مجموعة ','Group ']].sort((a,b)=>b[0].length-a[0].length);
const PAT=[[/^(\d+) نظري$/,'$1 theory'],[/^(\d+) عملي$/,'$1 practical'],[/^(\d+) مواد$/,'$1 subjects'],[/^(\d+) أسماء$/,'$1 names'],[/^(\d+) أدوات$/,'$1 tools'],[/^(\d+) أيام$/,'$1 days'],[/^(\d+) رابط$/,'$1 links'],[/^(\d+) من (\d+)$/,'$1 of $2']];
const AR=/[\u0600-\u06FF]/,flip=s=>s.replace(/[←→]/g,c=>c=='←'?'→':'←'),ND='٠١٢٣٤٥٦٧٨٩';
let RX=null;const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function build(){const ks=Object.keys(EN).filter(k=>k.trim()).sort((a,b)=>b.length-a.length);RX=new RegExp('(?<![\\u0621-\\u064A])(?:'+ks.map(esc).join('|')+')(?![\\u0621-\\u064A])','g')}
function tr(s){if(!RX)build();let o=s;
 if(AR.test(o)){for(const[a,b]of NM)if(o.includes(a))o=o.split(a).join(b);o=o.replace(RX,m=>EN[m]).replace(/Group ([أبجد])(?![\u0621-\u064A])/g,(m,l)=>'Group '+({'أ':'A','ب':'B','ج':'C','د':'D'})[l]);o=o.replace(/،/g,',').replace(/؟/g,'?').replace(/؛/g,';')}
 return flip(o.replace(/[٠-٩]/g,d=>ND.indexOf(d)))}
window.__tr=tr;
let lang='ar';try{lang=localStorage.gxl=='en'?'en':'ar'}catch(e){}
const TX=new WeakMap(),AT=new WeakMap(),ATTR=['placeholder','aria-label','title','alt'];
const INI={'أ':'A','إ':'E','آ':'A','ع':'A','ص':'S','و':'W','ي':'Y','م':'M','ا':'A','ب':'B','ت':'T','ج':'G','ح':'H','خ':'K','د':'D','ر':'R','س':'S','ش':'S','ط':'T','ف':'F','ق':'Q','ك':'K','ل':'L','ن':'N','ه':'H'};
function node(n){const pe=n.parentNode;if(pe&&pe.id=='lg')return;const r=TX.get(n);
 if(lang=='en'){if(r&&n.data===r.t)return;const t=pe&&pe.classList&&pe.classList.contains('av')&&INI[n.data.trim()]?INI[n.data.trim()]:tr(n.data);TX.set(n,{o:n.data,t});if(t!==n.data)n.data=t}
 else if(r){if(n.data===r.t)n.data=r.o;TX.delete(n)}}
function attrs(e){let r=AT.get(e);
 for(const a of ATTR){const v=e.getAttribute&&e.getAttribute(a);if(v==null)continue;r=r||{};const x=r[a];
  if(lang=='en'){if(x&&v===x.t)continue;const t=tr(v);r[a]={o:v,t};if(t!==v)e.setAttribute(a,t)}
  else if(x){if(v===x.t)e.setAttribute(a,x.o);delete r[a]}}
 if(r)AT.set(e,r)}
function walk(root){
 if(root.nodeType==3){node(root);return}
 if(root.nodeType!=1&&root.nodeType!=9)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE|TEXTAREA|CANVAS)$/.test(n.parentNode.nodeName)?2:1}),a=[];
 while(w.nextNode())a.push(w.currentNode);a.forEach(node);
 if(root.querySelectorAll){root.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(attrs);if(root.nodeType==1)attrs(root)}}
const mo=new MutationObserver(ms=>{if(lang!='en')return;const rs=new Set();ms.forEach(m=>{if(m.type=='characterData')node(m.target);else m.addedNodes.forEach(n=>rs.add(n))});rs.forEach(walk);mo.takeRecords()});
function set(l){lang=l;try{localStorage.gxl=l}catch(e){}
 RT.lang=l;RT.dir=l=='en'?'ltr':'rtl';walk(document);
 const b=document.getElementById('lg');if(b)b.textContent=l=='en'?'ع':'EN';
 dispatchEvent(new Event('gx'))}
['alert','confirm','prompt'].forEach(k=>{const f=window[k];window[k]=function(m,...r){return f.call(window,lang=='en'?tr(String(m)):m,...r)}});
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('#lg'))set(lang=='en'?'ar':'en')});
mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
if(lang=='en')set('en');else{const b=document.getElementById('lg');if(b)b.textContent='EN'}
})();
