/**
 * HABIT FIX WELLNESS - Main JavaScript
 * Founder & Wellness Coach: Raju Raut
 * Trilingual Translation Engine (English, Bengali, Hindi),
 * Mobile Navigation, Scroll Reveals, Interactive Tools
 */

(function ($) {
  'use strict';

  // ==========================================================================
  // COMPREHENSIVE TRILINGUAL DICTIONARY (English -> Hindi & Bengali)
  // ==========================================================================
  const TRANSLATIONS = {
    // Navigation & Dropdowns
    "About Coach": { hi: "कोच के बारे में", bn: "কোচ পরিচিতি" },
    "Programs & Services": { hi: "प्रोग्राम और सेवाएं", bn: "প্রোগ্রাম ও সেবাসমূহ" },
    "All Wellness Services": { hi: "सभी वेलनेस सेवाएं", bn: "সমস্ত ওয়েলনেস সেবা" },
    "Comprehensive personalized care plans": { hi: "व्यापक व्यक्तिगत स्वास्थ्य योजनाएं", bn: "ব্যাপক ব্যক্তিগতকৃত স্বাস্থ্য পরিকল্পনা" },
    "21-Day Habit Journey": { hi: "21-दिवसीय आदत यात्रा", bn: "২১ দিনের অভ্যাস যাত্রা" },
    "Structured 3-week routine reset": { hi: "संरचित 3-सप्ताह की दिनचर्या रीसेट", bn: "পরিকল্পিত ৩ সপ্তাহের রুটিন রিসেট" },
    "Global Online Coaching": { hi: "ग्लोबल ऑनलाइन कोचिंग", bn: "গ্লোবাল অনলাইন কোচিং" },
    "USA, UK, UAE, Canada, Australia & India": { hi: "यूएसए, यूके, यूएई, कनाडा, ऑस्ट्रेलिया और भारत", bn: "ইউএসএ, ইউকে, ইউএই, কানাডা, অস্ট্রেলিয়া ও ভারত" },
    "Ongoing Habit Support": { hi: "निरंतर आदत मार्गदर्शन", bn: "ধারাবাহিক অভ্যাস সহায়তা" },
    "Long-term accountability & maintenance": { hi: "दीर्घकालिक जवाबदेही और रखरखाव", bn: "দীর্ঘমেয়াদী জবাবদিহিতা ও রক্ষণাবেক্ষণ" },
    "BMI Calculator": { hi: "बीएमआई कैलकुलेटर", bn: "বিএমআই ক্যালকুলেটর" },
    "Free Tool": { hi: "मुफ़्त टूल", bn: "ফ্রি টুল" },
    "Transformations": { hi: "सफलता की कहानियां", bn: "রূপান্তরের গল্প" },
    "Resources & More": { hi: "संसाधन व अन्य", bn: "রিসোর্স ও অন্যান্য" },
    "Free Wellness Assessment": { hi: "मुफ्त स्वास्थ्य मूल्यांकन", bn: "ফ্রি ওয়েলনেস মূল্যায়ন" },
    "3-Minute personalized lifestyle score": { hi: "3-मिनट का व्यक्तिगत जीवनशैली स्कोर", bn: "৩ মিনিটের ব্যক্তিগত লাইফস্টাইল স্কোর" },
    "Downloadable Trackers": { hi: "डाउनलोड करने योग्य ट्रैकर्स", bn: "ডাউনলোডযোগ্য ট্র্যাকার" },
    "Free printable habit & hydration logs": { hi: "मुफ्त प्रिंट करने योग्य आदत और पानी लॉग", bn: "বিনামূল্যে প্রিন্টযোগ্য অভ্যাস ও পানি পানের লগ" },
    "Knowledge Hub Articles": { hi: "नॉलेज हब आर्टिकल्स", bn: "নলেজ হাব আর্টিকেলে" },
    "Science-based wellness & nutrition guides": { hi: "विज्ञान आधारित स्वास्थ्य और पोषण गाइड", bn: "বিজ্ঞানভিত্তিক ওয়েলনেস ও পুষ্টি গাইড" },
    "Start Here Guide": { hi: "शुरुआती गाइड", bn: "শুরুর নির্দেশিকা" },
    "Step-by-step roadmap for beginners": { hi: "शुरुआती लोगों के लिए चरण-दर-चरण रोडमैप", bn: "নতুনদের জন্য ধাপে ধাপে রোডম্যাপ" },
    "Contact & Support": { hi: "संपर्क एवं सहायता", bn: "যোগাযোগ ও সহায়তা" },
    "Direct reach to Coach Raju Raut": { hi: "कोच राजू राउत से सीधा संपर्क", bn: "কোচ রাজু রাউত এর সাথে সরাসরি যোগাযোগ" },
    "BOOK A CALL": { hi: "कॉल बुक करें", bn: "কল বুক করুন" },
    "BMI Tool": { hi: "बीएमआई टूल", bn: "বিএমআই টুল" },
    "Book 1-on-1 Consultation": { hi: "1-ऑन-1 परामर्श बुक करें", bn: "১-অন-১ পরামর্শ বুক করুন" },
    "Assessment": { hi: "मूल्यांकन", bn: "মূল্যায়ন" },
    "WhatsApp": { hi: "व्हाट्सएप", bn: "হোয়াটসঅ্যাপ" },
    "Select Language / ভাষা / भाषा:": { hi: "भाषा चुनें:", bn: "ভাষা নির্বাচন করুন:" },
    "International Wellness Coaching": { hi: "अंतर्राष्ट्रीय वेलनेस कोचिंग", bn: "আন্তর্জাতিক ওয়েলনেস কোচিং" },

    // Hero & Tagline Statements
    "Build Better Habits. Feel Better. Live Better.": {
      hi: "बेहतर आदतें बनाएं। बेहतर महसूस करें। बेहतर जिएं।",
      bn: "উন্নত অভ্যাস গড়ুন। সুস্থ অনুভব করুন। সুন্দর বাঁচুন।"
    },
    "Personalized wellness guidance, healthy habits, nutrition awareness, hydration tracking, BMI calculator, and lifestyle coaching.": {
      hi: "व्यक्तिगत स्वास्थ्य मार्गदर्शन, स्वस्थ आदतें, पोषण जागरूकता, हाइड्रेशन ट्रैकिंग, बीएमआई कैलकुलेटर और जीवन शैली कोचिंग।",
      bn: "ব্যক্তিগত স্বাস্থ্য নির্দেশনা, স্বাস্থ্যকর অভ্যাস, পুষ্টি সচেতনতা, হাইড্রেশন ট্র্যাকিং, বিএমআই ক্যালকুলেটর এবং লাইফস্টাইল কোচিং।"
    },
    "Meet Raju Raut": { hi: "कोच राजू राउत से मिलें", bn: "কোচ রাজু রাউত এর সাথে পরিচিত হোন" },
    "\"I believe wellness should be simple, practical, and sustainable.\"": {
      hi: "\"मेरा मानना है कि स्वास्थ्य सरल, व्यावहारिक और टिकाऊ होना चाहिए।\"",
      bn: "\"আমি বিশ্বাস করি সুস্থতা হওয়া উচিত সহজ, ব্যবহারিক এবং টেকসই।\""
    },
    "Understand → Personalize → Act → Track → Improve": {
      hi: "समझें → व्यक्तिगत बनाएं → कार्य करें → ट्रैक करें → सुधारें",
      bn: "বুঝুন → ব্যক্তিগতকরণ করুন → কাজ করুন → ট্র্যাক করুন → উন্নতি করুন"
    },
    "No Gimmicks. No False Promises.": {
      hi: "कोई नौटंकी नहीं। कोई झूठे वादे नहीं।",
      bn: "কোনো কৌশল নেই। কোনো মিথ্যা প্রতিশ্রুতি নেই।"
    },
    "Questions First. Decision Later.": {
      hi: "पहले सवाल पूछें। फैसला बाद में करें।",
      bn: "আগে প্রশ্ন করুন। সিদ্ধান্ত পরে নিন।"
    },
    "Have Questions Before You Decide?": {
      hi: "फैसला करने से पहले कोई सवाल है?",
      bn: "সিদ্ধান্ত নেওয়ার আগে কোনো প্রশ্ন আছে?"
    },
    "You are warmly invited to connect and ask questions directly. There is zero obligation to sign up for any program.": {
      hi: "आप सीधे जुड़ने और सवाल पूछने के लिए सादर आमंत्रित हैं। किसी भी कार्यक्रम के लिए साइन अप करने की कोई बाध्यता नहीं है।",
      bn: "আপনি সরাসরি যোগাযোগ করে প্রশ্ন করার জন্য সাদরে আমন্ত্রিত। কোনো প্রোগ্রামে সাইন আপ করার কোনো বাধ্যবাধকতা নেই।"
    },

    // Buttons & CTAs
    "Book a 1-on-1 Discovery Call": { hi: "1-ऑन-1 परामर्श कॉल बुक करें", bn: "১-অন-১ ডিসকভারি কল বুক করুন" },
    "Take Free Assessment": { hi: "मुफ्त मूल्यांकन शुरू करें", bn: "ফ্রি মূল্যায়ন শুরু করুন" },
    "Calculate Your BMI": { hi: "अपना बीएमआई जांचें", bn: "আপনার বিএমআই পরিমাপ করুন" },
    "Calculate BMI Now": { hi: "अभी बीएमआई निकालें", bn: "এখনই বিএমআই হিসাব করুন" },
    "Try BMI Calculator": { hi: "बीएमआई कैलकुलेटर आज़माएं", bn: "বিএমআই ক্যালকুলেটর ব্যবহার করুন" },
    "Browse Free Trackers": { hi: "मुफ़्त ट्रैकर्स देखें", bn: "ফ্রি ট্র্যাকারগুলো দেখুন" },
    "Print / Save as PDF": { hi: "प्रिंट / पीडीएफ में सहेजें", bn: "প্রিন্ট / পিডিএফ সেভ করুন" },
    "Preview & Print Tracker": { hi: "ट्रैकर देखें और प्रिंट करें", bn: "ট্র্যাকার দেখুন এবং প্রিন্ট করুন" },
    "Print / Save Tracker": { hi: "ट्रैकर प्रिंट / सेव करें", bn: "ট্র্যাকার প্রিন্ট / সেভ করুন" },
    "Chat with Coach Raju on WhatsApp": { hi: "व्हाट्सएप पर कोच राजू से बात करें", bn: "হোয়াটসঅ্যাপে কোচ রাজুর সাথে কথা বলুন" },
    "Schedule 1-on-1 Consultation": { hi: "1-ऑन-1 परामर्श शेड्यूल करें", bn: "১-অন-১ পরামর্শ শিডিউল করুন" },
    "View Full Journey": { hi: "पूरी यात्रा देखें", bn: "সম্পূর্ণ যাত্রা দেখুন" },
    "Start Your Similar Journey": { hi: "अपनी ऐसी ही यात्रा शुरू करें", bn: "আপনার যাত্রা শুরু করুন" },
    "SEND MY ENQUIRY": { hi: "मेरी पूछताछ भेजें", bn: "আমার বার্তা পাঠান" },
    "Next Step": { hi: "अगला चरण", bn: "পরবর্তী ধাপ" },
    "Previous Step": { hi: "पिछला चरण", bn: "আগের ধাপ" },
    "Submit Assessment": { hi: "मूल्यांकन जमा करें", bn: "मूल्याয়ন জমা দিন" },
    "Retake Assessment": { hi: "पुनः मूल्यांकन लें", bn: "পুনরায় মূল্যায়ন নিন" },
    "Close": { hi: "बंद करें", bn: "বন্ধ করুন" },

    // Page Titles & Sections
    "Weight Loss & Lifestyle Transformations": {
      hi: "वजन घटाने और जीवनशैली में बदलाव की कहानियां",
      bn: "ওজন নিয়ন্ত্রণ ও লাইফস্টাইল পরিবর্তনের গল্প"
    },
    "Real People. Real Experiences. Real Habits.": {
      hi: "सच्चे लोग। वास्तविक अनुभव। स्थायी आदतें।",
      bn: "বাস্তব মানুষ। প্রকৃত অভিজ্ঞতা। সঠিক অভ্যাস।"
    },
    "Habit Trackers & Printable Logs": {
      hi: "आदत ट्रैकर्स और प्रिंट करने योग्य लॉग",
      bn: "অভ্যাস ট্র্যাকার এবং প্রিন্টযোগ্য লগ"
    },
    "Smart BMI & Body Metrics Assessment": {
      hi: "स्मार्ट बीएमआई और शरीर मेट्रिक्स मूल्यांकन",
      bn: "স্মার্ট বিএমআই ও শারীরিক পরিমাপ মূল্যায়ন"
    },
    "Free 3-Minute Wellness Assessment": {
      hi: "मुफ्त 3-मिनट का स्वास्थ्य मूल्यांकन",
      bn: "ফ্রি ৩ মিনিটের ওয়েলনেস মূল্যায়ন"
    },
    "Book Your 1-on-1 Wellness Discovery Call": {
      hi: "अपना 1-ऑन-1 वेलनेस डिस्कवरी कॉल बुक करें",
      bn: "আপনার ১-অন-১ ওয়েলনেস ডিসকভারি কল বুক করুন"
    },
    "Get in Touch with Coach Raju": {
      hi: "कोच राजू से संपर्क करें",
      bn: "কোচ রাজুর সাথে যোগাযোগ করুন"
    },
    "Send an Enquiry": {
      hi: "अपनी पूछताछ भेजें",
      bn: "একটি বার্তা পাঠান"
    },
    "Knowledge Hub & Free Resources": {
      hi: "नॉलेज हब और मुफ्त संसाधन",
      bn: "নলেজ হাব এবং ফ্রি রিসোর্স"
    },
    "Privacy & Cookie Policy": {
      hi: "गोपनीयता और कुकी नीति",
      bn: "গোপনীয়তা ও কুকি নীতি"
    },
    "Medical & Health Disclaimer": {
      hi: "चिकित्सा और स्वास्थ्य अस्वीकरण",
      bn: "চিকিৎসা ও স্বাস্থ্য সংক্রান্ত শর্তাবলী"
    },
    "Terms & Service Agreement": {
      hi: "नियम एवं सेवा अनुबंध",
      bn: "শর্তাবলী ও সেবা চুক্তি"
    },
    "Start Here: Find Your Path": {
      hi: "यहां से शुरू करें: अपना रास्ता चुनें",
      bn: "এখানে শুরু করুন: আপনার পথ বেছে নিন"
    },
    "All Stories": { hi: "सभी कहानियां", bn: "সমস্ত গল্প" },
    "Weight Loss Focus": { hi: "वजन नियंत्रण फोकस", bn: "ওজন কমানোর ফোকাস" },
    "Daily Routine & Habits": { hi: "दैनिक दिनचर्या और आदतें", bn: "দৈনন্দিন রুটিন ও অভ্যাস" },
    "Vitality & Posture": { hi: "ऊर्जा और शारीरिक मुद्रा", bn: "প্রাণশক্তি ও ভঙ্গি" },

    // Form Field Labels & Placeholders
    "Your Name": { hi: "आपका नाम", bn: "আপনার নাম" },
    "Full name": { hi: "पूरा नाम", bn: "পুরো নাম" },
    "Email Address": { hi: "ईमेल पता", bn: "ইমেল ঠিকানা" },
    "WhatsApp / Phone": { hi: "व्हाट्सएप / फोन", bn: "হোয়াটসঅ্যাপ / ফোন" },
    "Country": { hi: "देश", bn: "দেশ" },
    "Consultation Type": { hi: "परामर्श का प्रकार", bn: "পরামর্শের ধরন" },
    "Preferred Date": { hi: "पसंदीदा तारीख", bn: "পছন্দের तारीख" },
    "Select Time Slot": { hi: "समय स्लॉट चुनें", bn: "সময় নির্বাচন করুন" },
    "Your Timezone": { hi: "आपका समय क्षेत्र", bn: "আপনার টাইমজোন" },
    "Consultation Language": { hi: "परामर्श की भाषा", bn: "পরামর্শের ভাষা" },
    "Subject": { hi: "विषय", bn: "বিষয়" },
    "Your Message": { hi: "आपका संदेश", bn: "আপনার বার্তা" },
    "Height": { hi: "ऊंचाई", bn: "উচ্চতা" },
    "Weight": { hi: "वजन", bn: "ওজন" },
    "Age": { hi: "उम्र", bn: "বয়স" },
    "Gender": { hi: "लिंग", bn: "লিঙ্গ" },
    "Male": { hi: "पुरुष", bn: "পুরুষ" },
    "Female": { hi: "महिला", bn: "মহিলা" },
    "Activity Level": { hi: "दैनिक गतिविधि स्तर", bn: "দৈনিক সক্রিয়তার মাত্রা" },
    "Ideal Weight Range": { hi: "आदर्श स्वस्थ वजन सीमा", bn: "আদর্শ সুস্থ ওজন পরিসীমা" },
    "Weight Difference": { hi: "वजन अंतर", bn: "ওজনের পার্থক্য" },
    "Daily Calorie Target (TDEE)": { hi: "दैनिक कैलोरी लक्ष्य (TDEE)", bn: "দৈনিক ক্যালোরি লক্ষ্য (TDEE)" },
    "Daily Hydration Target": { hi: "दैनिक पानी का लक्ष्य", bn: "দৈনিক পানি পানের লক্ষ্য" },
    "Coach Raju's Habit Advice": { hi: "कोच राजू की आदत सलाह", bn: "কোচ রাজুর অভ্যাসের পরামর্শ" },

    // Footer & Support
    "Client Support": { hi: "क्लाइंट सहायता", bn: "ক্লায়েন্ট সহায়তা" },
    "Navigation": { hi: "नेविगेशन", bn: "নেভিগেশন" },
    "Direct Contact": { hi: "सीधा संपर्क", bn: "সরাসরি যোগাযোগ" },
    "Medical Disclaimer": { hi: "चिकित्सा अस्वीकरण", bn: "চিকিৎসা ডিসক্লেইমার" },
    "Privacy Policy": { hi: "गोपनीयता नीति", bn: "গোপনীয়তা নীতি" },
    "Terms & Refunds": { hi: "नियम एवं शर्तें", bn: "শর্তাবলী ও রিফান্ড" },
    "Book Consultation": { hi: "परामर्श बुक करें", bn: "পরামর্শ বুক করুন" },
    "Knowledge Hub": { hi: "नॉलेज हब", bn: "নলেজ হাব" },
    "Terms & Conditions": { hi: "नियम एवं शर्तें", bn: "শর্তাবলী" },
    "Important Wellness Disclaimer:": { hi: "महत्वपूर्ण वेलनेस अस्वीकरण:", bn: "গুরুত্বপূর্ণ ওয়েলनेस ডিসক্লেইমার:" }
  };

  // Toast confirmation texts
  const TOAST_MESSAGES = {
    en: 'Language set to <strong>English</strong>. All coaching consultations and tools are ready.',
    hi: 'भाषा प्राथमिकता <strong>हिन्दी (Hindi)</strong> पर सेट की गई। सभी कोचिंग सत्र व सामग्री हिन्दी में उपलब्ध हैं!',
    bn: 'ভাষা পছন্দ <strong>বাংলা (Bengali)</strong> তে সেট করা হয়েছে। সমস্ত কোচিং সেবা ও বিষয়বস্তু বাংলায় প্রস্তুত!'
  };

  $(document).ready(function () {
    
    // 1. Sticky Header scroll effect
    const $header = $('.site-header');
    function updateHeader() {
      if ($(window).scrollTop() > 30) {
        $header.addClass('scrolled');
      } else {
        $header.removeClass('scrolled');
      }
    }
    $(window).on('scroll', updateHeader);
    updateHeader();

    // 2. Mobile Navbar auto-close on link click (excluding dropdown toggles)
    $(document).on('click', '.navbar-nav .nav-link:not(.dropdown-toggle), .header-dropdown-item, .mobile-drawer-cta-group a', function () {
      if ($('.navbar-collapse').hasClass('show')) {
        $('.header-hamburger-btn').click();
      }
    });

    // Mobile dropdown accordion toggling
    $('.header-nav-list .dropdown-toggle').on('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();
        const $parent = $(this).closest('.dropdown');
        const $menu = $parent.find('> .dropdown-menu');
        const isOpen = $parent.hasClass('show');

        // Close other sibling dropdowns for clean accordion behavior
        $('.header-nav-list .dropdown').not($parent).removeClass('show').find('> .dropdown-menu').removeClass('show');
        $('.header-nav-list .dropdown').not($parent).find('> .dropdown-toggle').attr('aria-expanded', 'false');

        if (isOpen) {
          $parent.removeClass('show');
          $menu.removeClass('show');
          $(this).attr('aria-expanded', 'false');
        } else {
          $parent.addClass('show');
          $menu.addClass('show');
          $(this).attr('aria-expanded', 'true');
        }
      }
    });

    // 3. Smooth scrolling for internal anchor links
    $('a[href^="#"]:not([href="#"]):not([data-bs-toggle])').on('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = $(targetId);
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 90
        }, 700);
      }
    });

    // 4. Scroll Reveal Animations via IntersectionObserver
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in').forEach(el => {
        revealObserver.observe(el);
      });
    } else {
      $('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in').addClass('is-revealed');
    }

    // 5. Interactive Metric Visualizer for Body & Wellness Education Matrix
    $('.matrix-tab-btn').on('click', function (e) {
      e.preventDefault();
      const metric = $(this).data('metric');
      $('.matrix-tab-btn').removeClass('active');
      $(this).addClass('active');

      $('.metric-detail-view').addClass('d-none');
      $('#metric-' + metric).removeClass('d-none').hide().fadeIn(350);
    });

    // ==========================================================================
    // 6. DEEP DOM TRANSLATION ENGINE (Full Website Text Translation)
    // ==========================================================================
    function translateEntireDom(targetLang) {
      document.documentElement.lang = targetLang;

      // Walk all text nodes and translate phrases
      const elementsToTranslate = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, a, button, span, label, th, td, small, strong, em, b, i, blockquote, .badge, .nav-link, .dropdown-item, .section-subtitle, .section-lead, .btn'
      );

      elementsToTranslate.forEach(el => {
        // Skip script, style, code, inputs
        if (['SCRIPT', 'STYLE', 'CODE', 'INPUT', 'TEXTAREA'].includes(el.tagName)) return;
        // Skip if element has children that are also block elements (to avoid clobbering nested structure)
        if (el.children.length > 2 && el.tagName !== 'A' && el.tagName !== 'BUTTON' && el.tagName !== 'SPAN') return;

        // Save original English on first encounter
        if (!el.hasAttribute('data-orig-text')) {
          el.setAttribute('data-orig-text', el.innerText.trim());
        }

        const origText = el.getAttribute('data-orig-text');
        if (!origText) return;

        if (targetLang === 'en') {
          // Restore English
          if (TRANSLATIONS[origText]) {
            const icon = el.querySelector('i');
            if (icon && el.textContent.trim() === origText) {
              const iconHtml = icon.outerHTML;
              el.innerHTML = iconHtml + ' ' + origText;
            } else {
              el.textContent = origText;
            }
          }
        } else {
          // Translate to hi or bn
          if (TRANSLATIONS[origText] && TRANSLATIONS[origText][targetLang]) {
            const translatedText = TRANSLATIONS[origText][targetLang];
            const icon = el.querySelector('i');
            if (icon) {
              const iconHtml = icon.outerHTML;
              el.innerHTML = iconHtml + ' ' + translatedText;
            } else {
              el.textContent = translatedText;
            }
          }
        }
      });

      // Translate Form Placeholders
      document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
        if (!input.hasAttribute('data-orig-placeholder')) {
          input.setAttribute('data-orig-placeholder', input.getAttribute('placeholder'));
        }
        const origPlaceholder = input.getAttribute('data-orig-placeholder');
        if (targetLang === 'en') {
          input.setAttribute('placeholder', origPlaceholder);
        } else if (TRANSLATIONS[origPlaceholder] && TRANSLATIONS[origPlaceholder][targetLang]) {
          input.setAttribute('placeholder', TRANSLATIONS[origPlaceholder][targetLang]);
        }
      });

      // Update Active Button Indicators
      $('.lang-btn').removeClass('active');
      $('.lang-btn[data-lang="' + targetLang + '"]').addClass('active');

      $('.mobile-lang-btn').removeClass('active');
      $('.mobile-lang-btn[data-lang="' + targetLang + '"]').addClass('active');

      $('.lang-dropdown-menu .dropdown-item').removeClass('active');
      $('.lang-dropdown-menu .dropdown-item[data-lang="' + targetLang + '"]').addClass('active');

      let currentLangLabel = 'English';
      if (targetLang === 'hi') currentLangLabel = 'हिन्दी';
      if (targetLang === 'bn') currentLangLabel = 'বাংলা';
      $('#currentLangBadge').html('<i class="fa-solid fa-language me-1 text-success"></i> ' + currentLangLabel);
    }

    window.setLanguage = function (lang, showToast) {
      if (showToast === undefined) showToast = true;
      if (!['en', 'hi', 'bn'].includes(lang)) lang = 'en';
      localStorage.setItem('habitfix_wellness_lang', lang);

      // Set Google Translate Cookie
      const gLang = (lang === 'en') ? '/en/en' : ('/en/' + lang);
      document.cookie = 'googtrans=' + gLang + '; path=/;';
      if (window.location.hostname) {
        document.cookie = 'googtrans=' + gLang + '; path=/; domain=.' + window.location.hostname + ';';
      }

      // Execute Native DOM Translation immediately
      translateEntireDom(lang);

      // Dispatch to Google Translate gadget if loaded
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = lang;
        combo.dispatchEvent(new Event('change'));
      }

      // Show user feedback toast
      if (showToast) {
        $('.toast-container').remove();
        const toastMsg = TOAST_MESSAGES[lang] || TOAST_MESSAGES.en;
        const toastHtml = 
          '<div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1095;">' +
            '<div class="toast show align-items-center text-bg-light border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">' +
              '<div class="d-flex p-2">' +
                '<div class="toast-body">' +
                  '<i class="fa-solid fa-earth-asia text-success fs-5 me-2"></i>' +
                  toastMsg +
                '</div>' +
                '<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
              '</div>' +
            '</div>' +
          '</div>';
        $('body').append(toastHtml);
        setTimeout(function () {
          $('.toast-container').fadeOut(400, function () { $(this).remove(); });
        }, 3500);
      }
    };

    // Auto-apply saved language preference immediately on DOM ready
    const savedLang = localStorage.getItem('habitfix_wellness_lang') || 'en';
    if (savedLang !== 'en') {
      translateEntireDom(savedLang);
    } else {
      translateEntireDom('en');
    }

    // Click Handlers for all Language Switchers
    $(document).on('click', '.lang-btn, .mobile-lang-btn, .lang-dropdown-menu .dropdown-item', function (e) {
      e.preventDefault();
      const selectedLang = $(this).data('lang');
      if (selectedLang) {
        window.setLanguage(selectedLang, true);
      }
    });

    // Optional Google Translate script injection for dynamic copy
    if (!document.getElementById('google-translate-script')) {
      const gtDiv = document.createElement('div');
      gtDiv.id = 'google_translate_element';
      gtDiv.style.display = 'none';
      document.body.appendChild(gtDiv);

      window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,bn',
          autoDisplay: false
        }, 'google_translate_element');

        if (savedLang && savedLang !== 'en') {
          setTimeout(function () {
            const combo = document.querySelector('.goog-te-combo');
            if (combo) {
              combo.value = savedLang;
              combo.dispatchEvent(new Event('change'));
            }
          }, 600);
        }
      };

      const gtScript = document.createElement('script');
      gtScript.id = 'google-translate-script';
      gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(gtScript);
    }

    // 7. Interactive Feedback on Floating Contact Buttons
    $('#floatingWhatsAppBtn').on('click', function () {
      console.log('User connected with Coach Raju on WhatsApp (+91 90512 31155)');
    });

    $('#floatingCallBtn').on('click', function () {
      console.log('User initiated phone call to Coach Raju (9051231155)');
    });

  });

})(jQuery);
