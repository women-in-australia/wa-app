-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2019 at 03:28 PM
-- Server version: 5.7.26-log
-- PHP Version: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wa`
--

-- --------------------------------------------------------

--
-- Table structure for table `occupation`
--

CREATE TABLE `occupation` (
  `oid` int(11) NOT NULL,
  `oname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `occupation`
--

INSERT INTO `occupation` (`oid`, `oname`) VALUES
(3, 'Aboriginal Elder'),
(4, 'Aboriginal mission or reserve'),
(5, 'Aboriginal spokesperson'),
(6, 'Aboriginal storyteller'),
(7, 'Academic'),
(8, 'Legal academic'),
(9, 'Academic administrator'),
(10, 'Accompanist'),
(11, 'Accountant'),
(12, 'Accounting machinist'),
(13, 'Activist'),
(14, 'Aboriginal rights activist'),
(15, 'Children\'s television activist'),
(16, 'Community activist'),
(17, 'Consumer activist'),
(18, 'Health consumer activist'),
(19, 'Human rights activist'),
(20, 'International activist'),
(21, 'Labour movement activist'),
(22, 'Nuclear disarmament activist'),
(23, 'Peace activist'),
(24, 'Playgroup Movement activist'),
(25, 'Political activist'),
(26, 'Social activist'),
(27, 'Temperance activist'),
(28, 'Union activist'),
(29, 'Welfare activist'),
(30, 'Women\'s rights activist'),
(31, 'Activist organisation'),
(32, 'Social activist organisation'),
(33, 'Actor'),
(34, 'Adjudicator'),
(35, 'Administration assistant'),
(36, 'Administrative officer'),
(37, 'Administrator'),
(38, 'Arts administrator'),
(39, 'Australian football club administrator'),
(40, 'Health administrator'),
(41, 'Hospital administrator'),
(42, 'Medical administrator'),
(43, 'Nursing administrator'),
(44, 'Advertising practitioner'),
(45, 'Advisor'),
(46, 'Cultural advisor'),
(47, 'Advisory body'),
(48, 'Advocate'),
(49, 'Birth control advocate'),
(50, 'Child welfare advocate'),
(51, 'Community advocate'),
(52, 'Dance advocate'),
(53, 'Human rights advocate'),
(54, 'Industrial advocate'),
(55, 'Migrant community advocate'),
(56, 'Migrant women\'s rights advocate'),
(57, 'Public education advocate'),
(58, 'Public health advocate'),
(59, 'Refugee advocate'),
(60, 'Social justice advocate'),
(61, 'Temperance advocate'),
(62, 'Women\'s advocate'),
(63, 'Women\'s health advocate'),
(64, 'Youth advocate'),
(65, 'Aged care worker'),
(66, 'Agriculturalist'),
(67, 'Air hostess'),
(68, 'Air traffic controller'),
(69, 'Air vice-marshal'),
(70, 'Alderman'),
(71, 'Ambassador'),
(72, 'Ambulance driver'),
(73, 'Anaesthetist'),
(74, 'Animator'),
(75, 'Anthropologist'),
(76, 'Anti-nuclear campaigner'),
(77, 'Anti-nuclear group'),
(78, 'Anti-nuclear organisation'),
(79, 'Antique dealer'),
(80, 'ANZSRC'),
(81, 'Aquatic performer'),
(82, 'Arbitrator'),
(83, 'International arbitrator'),
(84, 'Archaeologist'),
(85, 'Architect'),
(86, 'Landscape architect'),
(87, 'Archivist'),
(88, 'Army nurse'),
(89, 'Army officer (former)'),
(90, 'Army officer (Reserve)'),
(91, 'Arranger'),
(92, 'Art collector'),
(93, 'Art dealer'),
(94, 'Art director'),
(95, 'Art educator'),
(96, 'Art gallery director'),
(97, 'Art therapist'),
(98, 'Artist'),
(99, 'Botanical artist'),
(100, 'Henna artist'),
(101, 'Visual artist'),
(102, 'Artistic director'),
(103, 'Artwork'),
(104, 'Attorney'),
(105, 'Attorney General'),
(106, 'Audiometrist'),
(107, 'Author'),
(108, 'Government statutory authority'),
(109, 'Authority on childrenâs literature'),
(110, 'Award'),
(111, 'Writing award'),
(112, 'Bacteriologist'),
(113, 'Ballerina'),
(114, 'Banker'),
(115, 'Barrister'),
(116, 'Barrister\'s clerk'),
(117, 'Beauty therapist'),
(118, 'Bibliographer'),
(119, 'Biochemist'),
(120, 'Biographer'),
(121, 'Biologist'),
(122, 'Plant biologist'),
(123, 'Biometrician'),
(124, 'Bishop'),
(125, 'Blacksmith'),
(126, 'Boarding house keeper'),
(127, 'Boarding house worker'),
(128, 'Book collector'),
(129, 'Bookkeeper'),
(130, 'Bookseller'),
(131, 'Botanical collector'),
(132, 'Botanist'),
(133, 'Amateur botantist'),
(134, 'Brewer'),
(135, 'Broadcaster'),
(136, 'Buddhist leader'),
(137, 'Bureaucrat'),
(138, 'Burns specialist'),
(139, 'Bus driver'),
(140, 'Bushranger'),
(141, 'Business analyst'),
(142, 'Business inspector'),
(143, 'Business manager'),
(144, 'Business owner'),
(145, 'Businesswoman'),
(146, 'CafÃ©'),
(147, 'CafÃ© owner'),
(148, 'CafÃ© proprietor'),
(149, 'Campaign manager'),
(150, 'Campaigner'),
(151, 'Carer'),
(152, 'Caricaturist'),
(153, 'Cartoonist'),
(154, 'Catholic lay leader'),
(155, 'Celebration'),
(156, 'Chairperson'),
(157, 'Chancellor'),
(158, 'Charity worker'),
(159, 'Cheesemaker'),
(160, 'Chef'),
(161, 'Chemist'),
(162, 'Chief Executive Officer'),
(163, 'Chief Judge'),
(164, 'Chief Justice'),
(165, 'Chief Magistrate'),
(166, 'Chief of Staff'),
(167, 'Chief Operating Officer'),
(168, 'Child and public health researcher'),
(169, 'Childbirth educator'),
(170, 'Childcare worker'),
(171, 'Childrenâs welfare services'),
(172, 'Choreographer'),
(173, 'Church worker'),
(174, 'Cinematographer'),
(175, 'Civil celebrant'),
(176, 'Civil libertarian'),
(177, 'Clerk'),
(178, 'Sales clerk'),
(179, 'Coach'),
(180, 'Athletics coach'),
(181, 'Australian Rules Football coach'),
(182, 'Hockey coach'),
(183, 'Netball coach'),
(184, 'Squash coach'),
(185, 'Swimming coach'),
(186, 'Co-director'),
(187, 'Columnist'),
(188, 'Newspaper columnist'),
(189, 'Comedian'),
(190, 'Commemoration'),
(191, 'Commentator'),
(192, 'Commissioner'),
(193, 'Arbitration commissioner'),
(194, 'Commonwealth or Empire Games gold medalist'),
(195, 'Communications professional'),
(196, 'Communist'),
(197, 'Community arts worker'),
(198, 'Community development worker'),
(199, 'Community stalwart'),
(200, 'Community worker'),
(201, 'Company chairman'),
(202, 'Compere'),
(203, 'Compliance officer'),
(204, 'Composer'),
(205, 'Conductor'),
(206, 'Conference'),
(207, 'Conference organiser'),
(208, 'Congregational minister'),
(209, 'Conservationist'),
(210, 'Consultant'),
(211, 'Environmental consultant'),
(212, 'Health and safety consultant'),
(213, 'Human resources consultant'),
(214, 'Industrial relations consultant'),
(215, 'Management consultant'),
(216, 'Travel consultant'),
(217, 'Contortionist'),
(218, 'Conveyancer'),
(219, 'Convict'),
(220, 'Copywriter'),
(221, 'Coroner'),
(222, 'Councillor'),
(223, 'Legislative councillor'),
(224, 'Local government councillor'),
(225, 'Counsellor'),
(226, 'Christian counsellor'),
(227, 'Creative director'),
(228, 'Creche founder'),
(229, 'Criminologist'),
(230, 'Critic'),
(231, 'Crown Prosecutor'),
(232, 'Crown Solicitor'),
(233, 'Cultural commentator'),
(234, 'Curator'),
(235, 'Dance educator '),
(236, 'Dance notator'),
(237, 'Dancer'),
(238, 'Aboriginal traditional dancer'),
(239, 'Deaconess'),
(240, 'Dean'),
(241, 'Defence worker'),
(242, 'Delicatessen proprietor'),
(243, 'Demographer'),
(244, 'Dentist'),
(245, 'Deputy Mayor'),
(246, 'Designer'),
(247, 'Clothing designer'),
(248, 'Costume designer'),
(249, 'Fashion designer'),
(250, 'Graphic designer'),
(251, 'Landscape designer'),
(252, 'Developer'),
(253, 'Diarist'),
(254, 'Dietician'),
(255, 'Diplomat'),
(256, 'Director'),
(257, 'Casting director'),
(258, 'Choir director'),
(259, 'Company director'),
(260, 'Kindergarten director'),
(261, 'Managing Director'),
(262, 'Music director'),
(263, 'Research director'),
(264, 'Television director'),
(265, 'Theatre director'),
(266, 'Theatrical director'),
(267, 'Disability rights activist'),
(268, 'Doctor'),
(269, 'Dog trainer'),
(270, 'Domestic violence campaigner'),
(271, 'Domestic worker'),
(272, 'Drafting officer'),
(273, 'Drama coach'),
(274, 'Dramatist \r\n'),
(275, 'Dressmaker'),
(276, 'Drover'),
(277, 'Early childhood educationist'),
(278, 'Ecologist'),
(279, 'Economist'),
(280, 'Resource economist'),
(281, 'Editor'),
(282, 'Fashion editor'),
(283, 'Education reformer'),
(284, 'Educational association'),
(285, 'Educational institution'),
(286, 'Educationist'),
(287, 'Educator'),
(288, 'Nurse educator'),
(289, 'Electoral campaign manager'),
(290, 'Electoral reformer'),
(291, 'Electorate officer'),
(292, 'Electrical contractor'),
(293, 'Embroiderer'),
(294, 'Employment agency'),
(295, 'Enamellist'),
(296, 'Endocrinologist'),
(297, 'Engineer'),
(298, 'Aeronautical engineer'),
(299, 'Audio engineer'),
(300, 'Civil engineer'),
(301, 'Electrical engineer'),
(302, 'Mechanical engineer'),
(303, 'Entomologist'),
(304, 'Entrepreneur'),
(305, 'Mining entrepreneur'),
(306, 'Environmentalist'),
(307, 'Equal Employment Opportunity Officer'),
(308, 'Equal Opportunity practitioner'),
(309, 'Equal pay campaigner'),
(310, 'Ethnographer'),
(311, 'Ethnomusicologist'),
(312, 'Eugenicist'),
(313, 'Evangelist'),
(314, 'Event organiser'),
(315, 'Executive'),
(316, 'Exercise physiologist'),
(317, 'Exhibition'),
(318, 'Explorer'),
(319, 'Facilitator'),
(320, 'Factory inspector'),
(321, 'Farmer'),
(322, 'Cattle farmer'),
(323, 'Dairy farmer'),
(324, 'Egg farmer'),
(325, 'Farmer\'s wife'),
(326, 'Grazier'),
(327, 'Pioneer farmer'),
(328, 'Poultry farmer'),
(329, 'Sheep farmer'),
(330, 'Wheat farmer'),
(331, 'Woolgrower'),
(332, 'Feminist'),
(333, 'Feminist conference'),
(334, 'Feminist manifesto'),
(335, 'Feminist organisation'),
(336, 'Feminist publisher'),
(337, 'Feminist lobbyist'),
(338, 'Feminist support service'),
(339, 'Feminist theologian'),
(340, 'Feminist theorist'),
(341, 'Femocrat'),
(342, 'Film critic'),
(343, 'Film director'),
(344, 'Film editor'),
(345, 'Film producer'),
(346, 'Film writer'),
(347, 'Filmmaker'),
(348, 'Documentary filmmaker'),
(349, 'Finance officer'),
(350, 'Financial adviser'),
(351, 'First aid trainer'),
(352, 'Flight attendant'),
(353, 'Florist'),
(354, 'Folklorist'),
(355, 'Forensic physician'),
(356, 'Former British child migrant'),
(357, 'Founder'),
(358, 'Gallery owner'),
(359, 'Garden designer'),
(360, 'Gardener'),
(361, 'Genealogist'),
(362, 'General manager'),
(363, 'Geneticist'),
(364, 'Geographer'),
(365, 'Geologist'),
(366, 'Governess'),
(367, 'Government agency'),
(368, 'Government department'),
(369, 'Government medical officer'),
(370, 'Government review'),
(371, 'Governor'),
(372, 'Governor-General'),
(373, 'Governor-General\'s spouse'),
(374, 'Governor\'s spouse'),
(375, 'Haematologist'),
(376, 'Hairdresser'),
(377, 'Headmistress'),
(378, 'Health scientist'),
(379, 'Health service'),
(380, 'Health worker'),
(381, 'Public health worker'),
(382, 'Heritage consultant'),
(383, 'Historian'),
(384, 'Art historian'),
(385, 'Ethnohistorian'),
(386, 'Local historian'),
(387, 'Historical collection'),
(388, 'Historical landmark'),
(389, 'Historical theme'),
(390, 'Homemaker'),
(391, 'Horse breeder'),
(392, 'Horticulturalist'),
(393, 'Hospital'),
(394, 'Hospital chaplain'),
(395, 'Host'),
(396, 'Hotel owner'),
(397, 'Hotel worker'),
(398, 'Hotelier'),
(399, 'Housemaid'),
(400, 'Housewife'),
(401, 'Human resources manager'),
(402, 'Human resources officer'),
(403, 'Human rights organisation'),
(404, 'Humanitarian'),
(405, 'Illustrator'),
(406, 'Immunologist'),
(407, 'Indexer'),
(408, 'Industrial action'),
(409, 'Industrial officer'),
(410, 'Industrial organiser'),
(411, 'In-House Counsel'),
(412, 'Inspector for State Children\'s Department'),
(413, 'Interior decorator'),
(414, 'Interior designer'),
(415, 'Internationalist'),
(416, 'Interpreter'),
(417, 'IT professional'),
(418, 'Jeweller'),
(419, 'Jewellery designer'),
(420, 'Jewish community leader'),
(421, 'Journalism trainer'),
(422, 'Journalist'),
(423, 'Photo journalist'),
(424, 'Print journalist'),
(425, 'Radio journalist'),
(426, 'Sports journalist'),
(427, 'Judge'),
(428, 'Judge\'s associate'),
(429, 'Jurist'),
(430, 'Justice of the Peace'),
(431, 'Kindergarten principal'),
(432, 'Kindergarten worker'),
(433, 'Laboratory assistant'),
(434, 'Landowner'),
(435, 'Landscape gardener'),
(436, 'Law clerk'),
(437, 'Law reporter'),
(438, 'Lawyer'),
(439, 'Environmental lawyer'),
(440, 'Government lawyer'),
(441, 'Human rights lawyer'),
(442, 'Legal Aid lawyer'),
(443, 'Military lawyer'),
(444, 'Lay leader'),
(445, 'Lay preacher'),
(446, 'Laywoman'),
(447, 'Leader'),
(448, 'Aboriginal leader'),
(449, 'Community leader'),
(450, 'Ethnic leader'),
(451, 'Girl Guides\' leader'),
(452, 'Islamic community leader'),
(453, 'Red Cross leader'),
(454, 'Rural leader'),
(455, 'Lecturer'),
(456, 'Legal advisor'),
(457, 'Legal editor'),
(458, 'Legal officer'),
(459, 'Legal practitioner'),
(460, 'Legal project officer'),
(461, 'Legal reporter'),
(462, 'Legal writer'),
(463, 'Liaison officer'),
(464, 'Librarian'),
(465, 'Library'),
(466, 'Library assistant'),
(467, 'Lieutenant-Governor'),
(468, 'Lifesaver'),
(469, 'Linguist'),
(470, 'Literary critic'),
(471, 'Literary mentor'),
(472, 'Litigant'),
(473, 'Litigator'),
(474, 'Lobby group'),
(475, 'Magazine'),
(476, 'Magistrate'),
(477, 'Mail agent'),
(478, 'Manager'),
(479, 'Client service manager'),
(480, 'Environmental manager'),
(481, 'Factory manager'),
(482, 'Office manager'),
(483, 'Project manager'),
(484, 'Property manager'),
(485, 'Shop manager'),
(486, 'Marketing officer'),
(487, 'Marketing professional'),
(488, 'Marriage celebrant'),
(489, 'Mathematician'),
(490, 'Matron'),
(491, 'Hospital matron'),
(492, 'Prison matron'),
(493, 'Mayor'),
(494, 'Mayoress'),
(495, 'Media advisor'),
(496, 'Media artist'),
(497, 'Media executive'),
(498, 'Media policy developer'),
(499, 'Media presenter'),
(500, 'Mediator'),
(501, 'Medical practitioner'),
(502, 'Gynaecologist'),
(503, 'Obstetrician'),
(504, 'Medical receptionist'),
(505, 'Meeting place'),
(506, 'Mentor'),
(507, 'Metalworker'),
(508, 'Methodist lay leader'),
(509, 'Microanalyst'),
(510, 'Microbiologist'),
(511, 'Midwife'),
(512, 'Migrant support worker'),
(513, 'Migrant welfare organisation'),
(514, 'Migrant women\'s organisations'),
(515, 'Migration agent'),
(516, 'Milliner'),
(517, 'Miner'),
(518, 'Minister'),
(519, 'Missionary'),
(520, 'Model'),
(521, 'Moderator'),
(522, 'Molecular oncologist'),
(523, 'Moral theologian'),
(524, 'Mortgage broker'),
(525, 'Mother'),
(526, 'Mountaineer'),
(527, 'Museum'),
(528, 'Museum assistant'),
(529, 'Music adjudicator'),
(530, 'Music critic'),
(531, 'Music inspector'),
(532, 'Musician'),
(533, 'Musicologist'),
(534, 'Mycologist'),
(535, 'Natural resource manager'),
(536, 'Natural therapist'),
(537, 'Naturalist'),
(538, 'Naturopath'),
(539, 'Naval officer'),
(540, 'Netball umpire'),
(541, 'Newspaper proprietor'),
(542, 'Novelist'),
(543, 'Nurse'),
(544, 'Dental nurse'),
(545, 'Mothercraft nurse'),
(546, 'Occupational health nurse'),
(547, 'Psychiatric nurse'),
(548, 'Nutritionist'),
(549, 'Occupational therapist'),
(550, 'Office assistant'),
(551, 'Office worker'),
(552, 'Olympian'),
(553, 'Olympic sports team'),
(554, 'Ombudsman'),
(555, 'Ophthalmologist'),
(556, 'Optometrist'),
(557, 'Orchardist'),
(558, 'Organisation'),
(559, 'Academic organisation'),
(560, 'Advocacy organisation'),
(561, 'Armed services organisation'),
(562, 'Arts organisation'),
(563, 'Community organisation'),
(564, 'Ethnic welfare organisation'),
(565, 'Ex-Armed services organisation'),
(566, 'Ex-Services organisation'),
(567, 'Humanitarian organisation'),
(568, 'Membership organisation'),
(569, 'Non-violent organisation'),
(570, 'Not for profit organisation'),
(571, 'Peace organisation'),
(572, 'Performing arts organisation'),
(573, 'Philanthropic organisation'),
(574, 'Political organisation'),
(575, 'Public speaking organisation supervisory body'),
(576, 'Religious organisation'),
(577, 'Rural organisation'),
(578, 'Services organisation'),
(579, 'Social action organisation'),
(580, 'Social reform organisation'),
(581, 'Social support organisation'),
(582, 'Sports organisation'),
(583, 'Voluntary organisation'),
(584, 'Welfare organisation'),
(585, 'Women\'s rights organisation'),
(586, 'Women\'s suffrage organisation'),
(587, 'Organist'),
(588, 'Ornithologist'),
(589, 'Osteopath'),
(590, 'Pacifist'),
(591, 'Paediatric gastroenterologist'),
(592, 'Paediatrician'),
(593, 'Painter'),
(594, 'China painter'),
(595, 'Palaeontologist'),
(596, 'Palynologist'),
(597, 'Paralympian'),
(598, 'Parliamentarian'),
(599, 'Parliamentary Counsel'),
(600, 'Parole officer'),
(601, 'Partner'),
(602, 'Pastoralist'),
(603, 'Pastoralist wife'),
(604, 'Pathologist'),
(605, 'Patriotic fund raiser'),
(606, 'Patron'),
(607, 'Peace campaigner'),
(608, 'Peak body'),
(609, 'Pentecostalist leader'),
(610, 'Pentecostalist pastor'),
(611, 'Performer'),
(612, 'Periodontist'),
(613, 'Permaculturist'),
(614, 'Personnel manager'),
(615, 'Pharmacist'),
(616, 'Pharmacy assistant'),
(617, 'Philanthropic administrator'),
(618, 'Philanthropist'),
(619, 'Philatelist'),
(620, 'Philosopher'),
(621, 'Photographer'),
(622, 'Physician'),
(623, 'Physicist'),
(624, 'Physiotherapist'),
(625, 'Pianist'),
(626, 'Concert pianist'),
(627, 'Pilot'),
(628, 'Pioneer'),
(629, 'Plant biochemist'),
(630, 'Plant pathologist'),
(631, 'Playwright'),
(632, 'Poet'),
(633, 'Police commissioner'),
(634, 'Police officer'),
(635, 'Policewoman'),
(636, 'Policy adviser'),
(637, 'Policy co-ordinator'),
(638, 'Policy maker'),
(639, 'Political advisor'),
(640, 'Political and industrial organiser'),
(641, 'Political candidate'),
(642, 'Political party'),
(643, 'Political party organiser'),
(644, 'Political scientist'),
(645, 'Political staffer'),
(646, 'Politician'),
(647, 'Postmistress'),
(648, 'Potter'),
(649, 'Preacher'),
(650, 'Premier'),
(651, 'Presenter'),
(652, 'President'),
(653, 'Priest'),
(654, 'Prime Minister'),
(655, 'Principal'),
(656, 'Printer'),
(657, 'Printmaker'),
(658, 'Prioress'),
(659, 'Private hospital owner'),
(660, 'Producer'),
(661, 'Production designer'),
(662, 'Professional association'),
(663, 'Professional photographer'),
(664, 'Professor'),
(665, 'Associate professor'),
(666, 'Program manager'),
(667, 'Project officer'),
(668, 'Projectionist'),
(669, 'Property developer'),
(670, 'Protesting'),
(671, 'Psychiatrist'),
(672, 'Psychologist'),
(673, 'Clinical psychologist'),
(674, 'Psychotherapist'),
(675, 'Public defender'),
(676, 'Public gardens'),
(677, 'Public relations professional'),
(678, 'Public servant'),
(679, 'Public speaker'),
(680, 'Public speaking club'),
(681, 'Publican'),
(682, 'Publication'),
(683, 'Publicist'),
(684, 'Publisher'),
(685, 'Queen\'s Counsel'),
(686, 'RAAF officer'),
(687, 'Rabbi'),
(688, 'Radio actor'),
(689, 'Radio announcer'),
(690, 'Radio broadcaster'),
(691, 'Radio broadcasting'),
(692, 'Radio executive'),
(693, 'Radio presenter'),
(694, 'Radio producer'),
(695, 'Radio writer'),
(696, 'Radiographer'),
(697, 'Radiologist'),
(698, 'Real estate agent'),
(699, 'Rebel'),
(700, 'Red Cross worker'),
(701, 'Refugee'),
(702, 'Refugee support worker'),
(703, 'Regulator'),
(704, 'Religious leader'),
(705, 'Religious sister'),
(706, 'Religious worker'),
(707, 'Research'),
(708, 'Research assistant'),
(709, 'Research Centre'),
(710, 'Research officer'),
(711, 'Fire research officer'),
(712, 'Researcher'),
(713, 'Environmental researcher'),
(714, 'Health researcher'),
(715, 'Medical researcher'),
(716, 'Restauranteur'),
(717, 'Revolutionist'),
(718, 'Rheumatologist'),
(719, 'Sales assistant'),
(720, 'Sales manager'),
(721, 'Satirist'),
(722, 'Scholar'),
(723, 'School assistant'),
(724, 'School inspector'),
(725, 'School principal'),
(726, 'Scientist'),
(727, 'Computer scientist'),
(728, 'Environmental scientist'),
(729, 'Medical scientist'),
(730, 'Research scientist'),
(731, 'Veterinary scientist'),
(732, 'Screenwriter'),
(733, 'Script editor'),
(734, 'Scriptwriter'),
(735, 'Sculptor'),
(736, 'Secretary'),
(737, 'Executive secretary'),
(738, 'Legal secretary'),
(739, 'Medical secretary'),
(740, 'Press secretary'),
(741, 'Union secretary'),
(742, 'Senator'),
(743, 'Senior Counsel'),
(744, 'Sericulturalist'),
(745, 'Serologist'),
(746, 'Service organisation'),
(747, 'Servicewoman'),
(748, 'Set designer'),
(749, 'Sex reformer'),
(750, 'Shire president'),
(751, 'Shop proprietor'),
(752, 'Shopkeeper'),
(753, 'Singer'),
(754, 'Opera singer'),
(755, 'Single mother'),
(756, 'Social awareness organisation'),
(757, 'Social change'),
(758, 'Social commentator'),
(759, 'Social entrepreneur'),
(760, 'Social organisation'),
(761, 'Social reformer'),
(762, 'Social scientist'),
(763, 'Social services'),
(764, 'Social theorist'),
(765, 'Social welfare co-ordinator'),
(766, 'Social work educator '),
(767, 'Social worker'),
(768, 'Medical social worker'),
(769, 'Socialite'),
(770, 'Sociologist'),
(771, 'Soldier'),
(772, 'Solicitor'),
(773, 'Solicitor-General'),
(774, 'Songwriter'),
(775, 'Soprano'),
(776, 'Sport'),
(777, 'Sporting club'),
(778, 'Sporting organisation'),
(779, 'Sporting venue'),
(780, 'Sports administrator'),
(781, 'Sports commentator'),
(782, 'Sports event'),
(783, 'Sports team'),
(784, 'Sportswoman'),
(785, 'Athlete'),
(786, 'Australian Rules Football player'),
(787, 'Aviator'),
(788, 'Badminton player'),
(789, 'Basketball player'),
(790, 'Beach volleyball player'),
(791, 'Bodybuilder'),
(792, 'Bowler'),
(793, 'Boxer'),
(794, 'Canoe/kayaker'),
(795, 'Cricketer'),
(796, 'Cyclist'),
(797, 'Diver'),
(798, 'Equestrian'),
(799, 'Fencer'),
(800, 'Fishing champion'),
(801, 'Golfer'),
(802, 'Gymnast'),
(803, 'Handball player'),
(804, 'Hockey player'),
(805, 'Ironwoman'),
(806, 'Jockey'),
(807, 'Jodoka'),
(808, 'Lawn bowler'),
(809, 'Motor racing driver'),
(810, 'Netball player'),
(811, 'Pentathlete'),
(812, 'Physical culturalist'),
(813, 'Race walker'),
(814, 'Rower'),
(815, 'Royal Tennis player'),
(816, 'Rugby player'),
(817, 'Sailboarder'),
(818, 'Sailor'),
(819, 'Shooting champion'),
(820, 'Skier'),
(821, 'Snowboarder'),
(822, 'Soccer player'),
(823, 'Softball player'),
(824, 'Squash player'),
(825, 'Surf lifesaver'),
(826, 'Surfboard rider'),
(827, 'Surfer'),
(828, 'Swimmer'),
(829, 'Table tennis player'),
(830, 'Taekwondo'),
(831, 'Tennis player'),
(832, 'Tenpin bowler'),
(833, 'Track and field athlete'),
(834, 'Triathlete'),
(835, 'Water polo player'),
(836, 'Weightlifter'),
(837, 'Wheelchair track and road racer'),
(838, 'Yachtswoman'),
(839, 'Staff nurse'),
(840, 'Stage actor'),
(841, 'State Premier'),
(842, 'Statistician'),
(843, 'Statutory office holder'),
(844, 'Stenographer'),
(845, 'Legal stenographer'),
(846, 'Stockbroker'),
(847, 'Stockwoman'),
(848, 'Storyteller'),
(849, 'Strategic adviser'),
(850, 'Student'),
(851, 'Suffragette'),
(852, 'Suffragist'),
(853, 'Superintendent'),
(854, 'Supervisor'),
(855, 'Surgeon'),
(856, 'Orthopaedic surgeon'),
(857, 'Plastic surgeon'),
(858, 'Swimming instructor'),
(859, 'Tailoress'),
(860, 'Taxation officer'),
(861, 'Teacher'),
(862, 'Art teacher'),
(863, 'Biology teacher'),
(864, 'Cookery teacher'),
(865, 'Dance teacher'),
(866, 'Kindergarten teacher'),
(867, 'Music teacher'),
(868, 'Scripture teacher'),
(869, 'Special needs teacher'),
(870, 'Sunday school teacher'),
(871, 'Technical adviser'),
(872, 'Technical assistant'),
(873, 'Telecommunications officer'),
(874, 'Telephonist'),
(875, 'Television actor'),
(876, 'Television broadcaster'),
(877, 'Television journalist'),
(878, 'Television personality'),
(879, 'Television producer'),
(880, 'Television writer'),
(881, 'Tertiary education institution'),
(882, 'Theatre performance'),
(883, 'Theatre performer'),
(884, 'Theologian'),
(885, 'Tour guide'),
(886, 'Tour operator'),
(887, 'Town planner'),
(888, 'Trade union'),
(889, 'Trade union official'),
(890, 'Traditional Aboriginal custodian'),
(891, 'Training institution'),
(892, 'Translator'),
(893, 'Traveller'),
(894, 'Tribunal member'),
(895, 'Trotting trainer'),
(896, 'Trust'),
(897, 'Tutor'),
(898, 'Typist'),
(899, 'Umpire'),
(900, 'Union'),
(901, 'Union officer'),
(902, 'Union organiser'),
(903, 'Unionist'),
(904, 'Trade unionist'),
(905, 'University administrator'),
(906, 'University Chancellor'),
(907, 'University club/society'),
(908, 'University lecturer'),
(909, 'University teacher'),
(910, 'University tutor'),
(911, 'University vice-chancellor'),
(912, 'Urologist'),
(913, 'Vedic medicine practitioner'),
(914, 'Veterinarian'),
(915, 'Vice-Chancellor'),
(916, 'Violinist'),
(917, 'Virologist'),
(918, 'Vocalist'),
(919, 'Voids Officer'),
(920, 'Voluntary Aid Detachment (VAD) worker'),
(921, 'Voluntary community support organisation'),
(922, 'Volunteer'),
(923, 'Volunteer fundraising organisation'),
(924, 'War correspondent'),
(925, 'War widow'),
(926, 'War worker'),
(927, 'Weaver'),
(928, 'Welfare worker'),
(929, 'Child welfare worker'),
(930, 'Winemaker'),
(931, 'Women in Agriculture Movement'),
(932, 'Womenâs advocacy'),
(933, 'Women\'s club'),
(934, 'Women\'s liberationist'),
(935, 'Women\'s musical group'),
(936, 'Women\'s organisation'),
(937, 'Women\'s reform group'),
(938, 'Women\'s refuge'),
(939, 'Women\'s refuge worker'),
(940, 'Women\'s reproductive health service'),
(941, 'Women\'s rights organiser'),
(942, 'Women\'s services provider'),
(943, 'Workers\' association'),
(944, 'Writer'),
(945, 'Children\'s writer'),
(946, 'Writers group'),
(947, 'Yoga instructor'),
(948, 'Youth worker'),
(949, 'Zionist'),
(950, 'Zoologist');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `occupation`
--
ALTER TABLE `occupation`
  ADD PRIMARY KEY (`oid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `occupation`
--
ALTER TABLE `occupation`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=951;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
