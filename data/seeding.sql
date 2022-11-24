BEGIN;
TRUNCATE TABLE "diary_entry","paragraph","category","keyword","capture","link", "diary_entry_has_keyword" RESTART IDENTITY;

INSERT INTO "category" ("label") VALUES
('veille'),
('bug'),
('astuce'),
('autre')
;
INSERT INTO "diary_entry" ("title","date","context","fixed","category_id") VALUES
('PWA',NOW(),null,null,1),
('métavers',NOW(),null,null,2),
('React',NOW(),null,null,3),
('Bug serveur',NOW(),'projet journal',TRUE,2),
('Bug mise à jour déplacement',NOW(),'hanoi towers',TRUE,2),
('Bug insertion BDD',NOW(),null,FALSE,1),
('Raccourcis clavier',NOW(),null,null,2),
('script npm',NOW(),null,null,3),
('models',NOW(),null,null,3)
;


INSERT INTO "keyword" ("label") VALUES
('C++'),
('Javascipt'),
('Node'),
('Serveur'),
('Responsive'),
('Cybersécurité'),
('Algo'),
('Express')
;

INSERT INTO "link" ("address","diary_entry_id") VALUES
('https://google.com', 1),
('https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils',1),
('https://randomuser.me/',2),
('https://www.webdesign-inspiration.com/fr/',3),
('https://google.com',4),
('https://www.youtube.com/watch?v=cbGB__V8MNk&ab_channel=Computerphile',5),
('https://leetcode.com/',6),
('https://app.hackthebox.com/',7)
;

INSERT INTO "paragraph" ("content","diary_entry_id") VALUES
('Propositum more progressu numquam in aliis adulatorum factitarunt quod hoc de vel more inexorabiles inexorabiles in obstinatum more vitium de neminem ob illo ob non in hoc de quod de, aliquando exitiale intepescit in neminem cohorte quod effervescebat aliquando illo factitarunt aliquando similia similia progressu elogio similia poenae eius cohorte in vitium more adulatorum elogio obstinatum intepescit ob addictum cohorte hoc hoc aliquando quod numquam aetatis et exitiale addictum inexorabiles numquam non vitium exitiale similia vitium addictum exitiale revocari fertur haec ob eius principes elogio factitarunt in vel revocari exitiale quoque vel similia eius non neminem quod exitiale iussisse factitarunt.',1),
('Perniciem cum Domitiano Constantius blande blandius ut cum et cum esse simulans odisse ad communi lege quaedam subinde blandius Gallum.',1),
('Vera honeste honeste aliquem nostris in honeste non quam in ipsi ab sit enim ut est sic modum numquam honeste.',2),
('Paucis videretur Africani loquentes et Fannio exposuit Marci et Marci arbitratu eam genero hoc exposui cum memoriae ipsam arbitratu.',3),
('Inmunibus aerumnas in ut praefectis se inpetraret coalitos metuens agens ut saltem ut gemens malivolus illas coalitos innocentium obsecrans minabatur.',4),
('His navigerum in nusquam provinciae visitur flumen medelarum navigerum dictione provinciae has suapte suapte dictione regiones iuris suapte flumen locis.',5),
('His navigerum in nusquam provinciae visitur flumen medelarum navigerum dictione provinciae has suapte suapte dictione regiones iuris suapte flumen locis.',6),
('Ponere nec cursibus vero gentium sermonibus disiunctissimas idque regionum ponere cursibus gestas res res idque posse peragrari non dicam peragrari.',7),
('Haec tumore dissimulantem rebellis ordo per contumacem maiestati et strepit novo postulat Augustae quae maiestati per contumacem incusat per nos.
',7),
('Est multa Gallus scrutabatur me necem lenius quorum ut est cadaveribus me quae nihilo quod huius multa modum modum singula.
',8),
('Et maritus hortabatur Bithyniam germanum Caesar causa se multis haerebat repentina haec cruentum haerebat sororem Constantius statione accitus profecta suspicionis.
',8)
;
INSERT INTO "diary_entry_has_keyword" ("diary_entry_id","keyword_id") VALUES
(1,1),
(1,2),
(1,3),
(2,1),
(3,4),
(4,1),
(5,2),
(5,6),
(6,7),
(6,5)
;

COMMIT;