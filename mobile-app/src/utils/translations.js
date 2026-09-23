// mobile-app/src/utils/translations.js
export const translations = {
  ENG: {
    goBack: 'Go back',
    registered: 'Registered',
    unregistered: 'Unregistered',
    tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
    prizePool: 'Prize Pool',
    entryFee: 'Entry Fee',
    spotsLeft: (spots) => `Only ${spots} spots left`,
    fullyBooked: 'Fully Booked',
    bookedRatio: (b, t) => `${b}/${t} Booked`,
    
    // Competition Content
    competitionTitle: 'Feedants - Classical Dance Event',
    aboutText: 'Feedants brings you the National Classical Dance Event open to dancers across all age categories. Showcase your mastery in Bharatanatyam, Kathak, Odissi, Kuchipudi, or Kathakali. Submit your uncut performance video from anywhere in India, get evaluated by renowned dance gurus, and win recognized certificates and cash awards.',
    parametersList: [
      'Rhythm & Timing (Taal) (30%)',
      'Expressions & Abhinaya (Bhava) (30%)',
      'Footwork & Grace (Angika) (25%)',
      'Costume & Presentation (15%)'
    ],
    rulesList: [
      'Open to all age categories and classical dance styles.',
      'Video submission must be between 2 to 5 minutes in duration.',
      'Only raw uncut performance videos with original audio will be accepted.',
      'Full-body posture and expressions must remain clearly visible throughout.'
    ],

    // Judge Card
    judgeLabel: 'Judge',
    judgeTitle: 'Professional Kathak Dancer',
    judgeExp: '12+ Years of Experience',
    introVideo: 'Intro Video',
    
    // Dates & Tabs
    regClosesIn: 'Registration closes in:',
    hurryUp: 'Hurry up!',
    importantDates: 'Important Dates',
    registerBefore: 'Register Before',
    submissionStarts: 'Submission Starts',
    submissionEnds: 'Submission Ends',
    resultDate: 'Result Date',
    previousWinners: 'Previous Winners',
    tabAbout: 'About Competition',
    tabJudging: 'Judging Parameters',
    tabRules: 'Rules & Eligibility',
    viewMore: 'View more ▼',
    viewLess: 'View less ▲',
    
    // Rewards
    rewardsTitle: 'Rewards (All Positions)',
    ranks: ['1st Winner', '2nd Winner', '3rd Winner', '4th Winner', '5th Winner', '6th Winner'],
    disclaimer: 'ⓘ Disclaimer: Only contributions from paid participants will be considered for judging.',
    
    // Trust & Referral
    faqPrize: 'How will you receive prize money?',
    watchVideo: 'Watch video to know more',
    refundPolicy: 'Refund policy',
    securePayments: 'Secure payments powered by',
    referTitle: 'Refer & Earn more discount',
    copyLink: 'Copy Link',
    referNow: 'Refer Now',
    earnSignup: 'You earn ₹10 for every signup',
    hearUsers: 'Hear From Our Users',
    hearUsersSub: 'See what participants say about Feedants',
    adHere: '(Ad Here)                 Made by Vipash',
    
    // Buttons & Nav
    registerNow: 'Register Now',
    uploadSubmission: 'Upload Submission',
    submissionUploaded: 'Submission Uploaded',
    nav: { home: 'Home', explore: 'Explore', comp: 'Competitions', profile: 'Profile' }
  },
  HINDI: {
    goBack: 'वापस जाएं',
    registered: 'पंजीकृत',
    unregistered: 'अपंजीकृत',
    tags: ['नृत्य', 'मल्टी-विन', 'विजेताओं को प्रमाणपत्र'],
    prizePool: 'पुरस्कार राशि',
    entryFee: 'प्रवेश शुल्क',
    spotsLeft: (spots) => `केवल ${spots} स्थान शेष`,
    fullyBooked: 'स्थान पूर्ण',
    bookedRatio: (b, t) => `${b}/${t} बुक किया गया`,
    
    // Competition Content
    competitionTitle: 'फ़ीडैंट्स - शास्त्रीय नृत्य प्रतियोगिता',
    aboutText: 'फ़ीडैंट्स आपके लिए राष्ट्रीय शास्त्रीय नृत्य प्रतियोगिता लेकर आया है, जो सभी आयु वर्ग के नर्तकों के लिए खुली है। भरतनाट्यम, कथक, ओडिसी, कुचिपुड़ी या कथकली में अपनी कला का प्रदर्शन करें। भारत में कहीं से भी अपना वीडियो सबमिट करें, प्रख्यात नृत्य गुरुओं द्वारा मूल्यांकित हों और नकद पुरस्कार व प्रमाण पत्र प्राप्त करें।',
    parametersList: [
      'लय और ताल (ताल) (30%)',
      'भाव और अभिनय (भाव) (30%)',
      'पद संचालन और लालित्य (आंगिक) (25%)',
      'वेशभूषा और मंच प्रस्तुति (15%)'
    ],
    rulesList: [
      'सभी आयु वर्ग और शास्त्रीय नृत्य शैलियों के लिए खुला है।',
      'वीडियो प्रस्तुति 2 से 5 मिनट की अवधि के बीच होनी चाहिए।',
      'केवल बिना कांट-छांट (raw uncut) का मूल ऑडियो वाला वीडियो ही मान्य होगा।',
      'पूरे प्रदर्शन के दौरान नर्तक की मुद्राएं और चेहरे के भाव स्पष्ट दिखने चाहिए।'
    ],

    // Judge Card
    judgeLabel: 'निर्णायक',
    judgeTitle: 'पेशेवर कथक नृत्यांगना',
    judgeExp: '12+ वर्षों का अनुभव',
    introVideo: 'परिचय वीडियो',
    
    // Dates & Tabs
    regClosesIn: 'पंजीकरण समाप्त होने में:',
    hurryUp: 'जल्दी करें!',
    importantDates: 'महत्वपूर्ण तिथियां',
    registerBefore: 'पंजीकरण अंतिम तिथि',
    submissionStarts: 'सबमिशन प्रारंभ',
    submissionEnds: 'सबमिशन समाप्त',
    resultDate: 'परिणाम तिथि',
    previousWinners: 'पिछले विजेता',
    tabAbout: 'प्रतियोगिता विवरण',
    tabJudging: 'निर्णय के मानक',
    tabRules: 'नियम व पात्रता',
    viewMore: 'और देखें ▼',
    viewLess: 'कम देखें ▲',
    
    // Rewards
    rewardsTitle: 'पुरस्कार (सभी स्थान)',
    ranks: ['प्रथम विजेता', 'द्वितीय विजेता', 'तृतीय विजेता', 'चौथा स्थान', 'पांचवां स्थान', 'छठा स्थान'],
    disclaimer: 'ⓘ अस्वीकरण: केवल भुगतान करने वाले प्रतिभागियों की प्रविष्टियों पर निर्णय लिया जाएगा।',
    
    // Trust & Referral
    faqPrize: 'पुरस्कार राशि कैसे प्राप्त होगी?',
    watchVideo: 'अधिक जानकारी के लिए वीडियो देखें',
    refundPolicy: 'धनवापसी नीति',
    securePayments: 'सुरक्षित भुगतान माध्यम',
    referTitle: 'रेफ़र करें और छूट पाएं',
    copyLink: 'लिंक कॉपी करें',
    referNow: 'अभी रेफ़र करें',
    earnSignup: 'प्रत्येक साइनअप पर ₹10 कमाएं',
    hearUsers: 'प्रतिभागियों की राय',
    hearUsersSub: 'जानें Feedants के बारे में प्रतिभागी क्या कहते हैं',
    adHere: 'विज्ञापन स्थान',
    
    // Buttons & Nav
    registerNow: 'अभी पंजीकरण करें',
    uploadSubmission: 'सबमिशन अपलोड करें',
    submissionUploaded: 'सबमिशन प्राप्त हुआ',
    nav: { home: 'होम', explore: 'एक्सप्लोर', comp: 'प्रतियोगिताएं', profile: 'प्रोफ़ाइल' }
  }
};