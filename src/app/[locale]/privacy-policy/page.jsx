const BASE_URL = "https://www.xchangelab.info";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const title = "Politique de confidentialité FunCenter | XLAB";
  const description =
    "Découvrez comment XLAB protège les données et la vie privée des élèves utilisant la plateforme éducative FunCenter.";

  return {
    title,
    description,
    alternates: {
      canonical: BASE_URL + "/" + locale + "/privacy-policy",
      languages: {
        fr: BASE_URL + "/fr/privacy-policy",
        ar: BASE_URL + "/ar/privacy-policy",
        "x-default": BASE_URL + "/fr/privacy-policy",
      },
    },
    openGraph: {
      title,
      description,
      url: BASE_URL + "/" + locale + "/privacy-policy",
      siteName: "Exchange Lab",
      locale: locale === "ar" ? "ar_MA" : "fr_MA",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function PrivacyPolicyPage() {
  return (
    <div dir="ltr" className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <header className="mb-8 text-center border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Politique de confidentialité de FunCenter</h1>
          <p className="text-gray-600 mb-4">Dernière mise à jour : 28 août 2026</p>
        </header>

        <p className="text-gray-600 mb-4">FunCenter est une plateforme éducative proposée par Exchange Lab (« XLAB », « nous », « notre »), destinée aux élèves, enseignants et administrateurs de XLAB.</p>

        <p className="text-gray-600 mb-4">Cette politique explique les informations traitées par FunCenter, la manière dont elles sont utilisées et les mesures prises par XLAB pour protéger la vie privée des utilisateurs, notamment des enfants.</p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>1. À qui s'applique cette politique ?</h2>
        <p className="text-gray-600 mb-4">Cette politique s'applique à la plateforme FunCenter ainsi qu'à ses versions web et applications mobiles.</p>
        <p className="text-gray-600 mb-4">FunCenter peut être utilisé par :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les élèves inscrits aux formations XLAB, y compris des enfants ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les enseignants de XLAB ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les administrateurs autorisés de XLAB.</span></li>
        </ul>
        <p className="text-gray-600 mb-4">Les comptes élèves sont créés et fournis par XLAB dans le cadre de l'inscription. Les élèves ne créent pas eux-mêmes leur compte FunCenter.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>2. Informations traitées</h2>
        <p className="text-gray-600 mb-4">XLAB traite uniquement les informations nécessaires au fonctionnement de FunCenter, à la gestion des formations et au suivi pédagogique des élèves.</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Informations liées au compte</h3>
        <p className="text-gray-600 mb-4">Ces informations peuvent comprendre :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>le prénom et le nom ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>un identifiant de compte attribué par XLAB et utilisé pour la connexion ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les informations relatives aux inscriptions, aux groupes, aux enseignants et aux horaires.</span></li>
        </ul>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Informations de profil</h3>
        <p className="text-gray-600 mb-4">Un élève peut disposer d'un profil FunCenter comprenant notamment :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>une photo de profil ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>des informations facultatives de présentation ou de personnalisation du profil, telles que certains centres d'intérêt ou préférences.</span></li>
        </ul>
        <p className="text-gray-600 mb-4">Ces informations sont utilisées dans le cadre de l'expérience FunCenter.</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Activité pédagogique et progression</h3>
        <p className="text-gray-600 mb-4">FunCenter peut traiter des informations concernant :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les présences et absences ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les devoirs et les travaux remis ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les quiz, réponses et résultats ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les notes et évaluations pédagogiques ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>la progression dans certaines vidéos ou ressources pédagogiques ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les évaluations ou notes attribuées à certaines ressources.</span></li>
        </ul>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Engagement et récompenses</h3>
        <p className="text-gray-600 mb-4">FunCenter utilise également certaines informations liées à l'activité de l'élève, notamment :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>le solde et l'historique des XLAB Coins ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les badges ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les séries d'activité (« streaks ») ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>certaines informations de classement.</span></li>
        </ul>
        <p className="text-gray-600 mb-4">Les XLAB Coins sont des points virtuels internes à FunCenter. Ils :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>n'ont aucune valeur monétaire réelle ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>ne peuvent pas être convertis en argent ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>ne peuvent pas être retirés ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>ne constituent pas un moyen de paiement réel.</span></li>
        </ul>
        <p className="text-gray-600 mb-4">Les éléments disponibles dans le Store FunCenter sont obtenus avec les XLAB Coins. FunCenter ne traite aucun paiement réel pour ces opérations.</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Informations techniques</h3>
        <p className="text-gray-600 mb-4">FunCenter traite également les données techniques nécessaires au fonctionnement sécurisé de la plateforme, notamment les informations liées aux sessions de connexion.</p>
        <p className="text-gray-600 mb-4">FunCenter n'utilise pas d'identifiant publicitaire à des fins de publicité et ne collecte pas la localisation précise des utilisateurs.</p>
        <p className="text-gray-600 mb-4">XLAB ne collecte pas, via FunCenter :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les coordonnées bancaires ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les numéros de carte de paiement ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les numéros de documents d'identité officiels ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>la localisation précise ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les listes de contacts du téléphone.</span></li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>3. Informations visibles par les camarades de classe</h2>
        <p className="text-gray-600 mb-4">FunCenter peut permettre aux élèves de voir certaines informations limitées concernant d'autres élèves de leur classe, notamment :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>leur prénom ou nom affiché ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>leur photo de profil ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>certaines informations liées aux badges, activités ou classements.</span></li>
        </ul>
        <p className="text-gray-600 mb-4">L'accès à ces informations est destiné à l'expérience pédagogique et communautaire au sein de XLAB.</p>
        <p className="text-gray-600 mb-4">FunCenter ne propose pas de système de messagerie privée ou de chat permettant aux élèves de contacter directement d'autres élèves à travers la plateforme.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>4. Prestataires et systèmes utilisés</h2>
        <p className="text-gray-600 mb-4">FunCenter utilise certains services techniques nécessaires à son fonctionnement.</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Supabase</h3>
        <p className="text-gray-600 mb-4">XLAB utilise Supabase pour certaines fonctions techniques de FunCenter, notamment :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>la base de données ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>l'authentification ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>le stockage de fichiers.</span></li>
        </ul>
        <p className="text-gray-600 mb-4">Supabase agit comme prestataire technique pour le fonctionnement de FunCenter.</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-6">Systèmes XLAB</h3>
        <p className="text-gray-600 mb-4">FunCenter peut également échanger certaines informations liées aux formations, inscriptions ou groupes avec les propres systèmes pédagogiques de XLAB, notamment la plateforme exploitée par XLAB.</p>
        <p className="text-gray-600 mb-4">Ces échanges permettent notamment de maintenir les informations pédagogiques et les inscriptions cohérentes entre les différents outils utilisés par XLAB.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>5. Publicité et utilisation commerciale des données</h2>
        <p className="text-gray-600 mb-4">FunCenter ne contient pas de publicité tierce.</p>
        <p className="text-gray-600 mb-4">XLAB n'utilise pas les informations des élèves dans FunCenter pour leur proposer de la publicité ciblée.</p>
        <p className="text-gray-600 mb-4">XLAB ne vend pas et ne loue pas les données personnelles des élèves à des annonceurs ou à des courtiers en données.</p>
        <p className="text-gray-600 mb-4">FunCenter n'utilise pas de système de suivi publicitaire destiné à suivre les élèves à travers différentes applications ou différents services à des fins publicitaires.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>6. Protection de la vie privée des enfants</h2>
        <p className="text-gray-600 mb-4">FunCenter est notamment utilisé par des enfants.</p>
        <p className="text-gray-600 mb-4">Pour cette raison, XLAB limite les informations traitées aux données nécessaires au fonctionnement du service éducatif et à l'expérience pédagogique.</p>
        <p className="text-gray-600 mb-4">En particulier :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les comptes élèves sont créés par XLAB dans le cadre de l'inscription ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>FunCenter ne diffuse pas de publicité tierce ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les XLAB Coins n'impliquent aucun paiement réel ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les parents ou responsables légaux peuvent contacter XLAB pour demander des informations concernant les données de leur enfant ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>les parents ou responsables légaux peuvent demander la correction ou la suppression de certaines informations, sous réserve des informations que XLAB doit conserver pour des raisons légitimes.</span></li>
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>7. Conservation et sécurité des données</h2>
        <p className="text-gray-600 mb-4">XLAB conserve les informations des élèves aussi longtemps que nécessaire pour fournir ses services éducatifs et maintenir les dossiers pédagogiques et administratifs légitimes.</p>
        <p className="text-gray-600 mb-4">Les parents ou responsables légaux peuvent demander la suppression des informations concernant leur enfant, sous réserve des informations que XLAB doit conserver pour des raisons légitimes liées notamment aux obligations légales, comptables, de sécurité ou de conservation des dossiers pédagogiques.</p>
        <p className="text-gray-600 mb-4">XLAB met en œuvre des mesures techniques et organisationnelles destinées à protéger les informations traitées par FunCenter.</p>
        <p className="text-gray-600 mb-4">Les communications avec les services utilisés par FunCenter sont protégées par les mécanismes de sécurité appropriés, notamment le chiffrement des communications lorsqu'il est applicable.</p>
        <p className="text-gray-600 mb-4">L'accès aux informations dans FunCenter est également limité en fonction du rôle de l'utilisateur et des autorisations nécessaires au fonctionnement du service.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>8. Droits et demandes des parents ou responsables légaux</h2>
        <p className="text-gray-600 mb-4">Un parent ou responsable légal peut contacter XLAB afin de demander notamment :</p>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>quelles informations FunCenter détient concernant son enfant ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>la correction d'informations inexactes ;</span></li>
          <li className="flex items-start"><span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span><span>la suppression de certaines informations ou du compte de son enfant, sous réserve des obligations légitimes de conservation de XLAB.</span></li>
        </ul>
        <p className="text-gray-600 mb-4">Les demandes concernant la confidentialité peuvent être envoyées à : <a href="mailto:contact@xchangelab.info" className="text-blue-600 hover:underline">contact@xchangelab.info</a></p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>9. Nous contacter</h2>
        <p className="text-gray-600 mb-4">Pour toute question concernant cette politique de confidentialité ou les informations traitées par FunCenter :</p>
        <p className="text-gray-700 mb-1 font-semibold">Exchange Lab (XLAB) — Xlabber Sarl</p>
        <p className="text-gray-600 mb-4">Email : <a href="mailto:contact@xchangelab.info" className="text-blue-600 hover:underline">contact@xchangelab.info</a></p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>10. Modifications de cette politique</h2>
        <p className="text-gray-600 mb-4">Cette politique peut être mise à jour afin de refléter les évolutions de FunCenter, des services XLAB ou de nos pratiques relatives aux données.</p>
        <p className="text-gray-600 mb-4">Lorsque cette politique est modifiée, la date de « Dernière mise à jour » affichée en haut de cette page est actualisée.</p>
        <p className="text-gray-600 mb-4">XLAB prendra des mesures raisonnables pour informer les utilisateurs ou les parents/responsables légaux lorsque des modifications importantes le nécessitent.</p>
      </div>
      </div>
    </div>
  );
}
