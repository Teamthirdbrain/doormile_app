export const FLUTTER_DASHBOARD_CODE = `import 'package:flutter/material';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const DoorMileApp());
}

class DoorMileApp extends StatelessWidget {
  const DoorMileApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DoorMile CRM',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF8D0012),
          primary: const Color(0xFF8D0012),
          primaryContainer: const Color(0xFFB51621),
          surface: const Color(0xFFF8F9FF),
          onSurface: const Color(0xFF0B1C30),
        ),
        textTheme: GoogleFonts.interTextTheme(),
      ),
      home: const DashboardScreen(),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FF),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(60),
        child: Container(
          decoration: const BoxDecoration(
            color: Colors.white,
            boxShadow: [
              BoxShadow(
                color: Color(0x0A000000),
                blurRadius: 10,
                offset: Offset(0, 2),
              )
            ],
          ),
          child: SafeArea(
            child: Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Image.network(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuD-lN7gpMpPT6Z0884o9yONGy64uJLEIae-5QkU5cSGoO_v0gudwpm5MaIM2iWsgeDDLt-XwEJKjUzTC98fnFudTiO2H-IIJKJ_lqqhFqR_FT_nv789RC4rCMZG6iTgYVWx7IdSxVWr8GdrUqdhVgFEzbm401zhMF17OMujtRpjxGoKC6RgYFoZCmxWv1Fn-2Ul6PmkB-3D9K0gvI55n0C5ee7n1Q6nZ1us8WOVVfvNTUi7ktl-wbM1avYH7TRNRmc5pPpYupH6qVo',
                  height: 32,
                  fit: BoxFit.contain,
                ),
              ),
            ),
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 12),
              // Welcome Text
              Text(
                'Good morning, Rep',
                style: GoogleFonts.hankenGrotesk(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF0B1C30),
                  letterSpacing: -0.01,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Ready to manage your logistics survey portfolio?',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.normal,
                  color: Color(0xFF5B403E),
                ),
              ),
              const SizedBox(height: 24),

              // Stats Bento Grid
              const StatsBentoGrid(
                totalClients: '1,284',
                entriesToday: 42,
                pendingFollowups: 18,
              ),
              const SizedBox(height: 24),

              // Quick Actions
              const Text(
                'Quick Actions',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF5B403E),
                ),
              ),
              const SizedBox(height: 12),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.person_add_outlined, size: 20),
                label: const Text('Quick Add Client'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF8D0012),
                  foregroundColor: Colors.white,
                  minimumSize: const Size.fromHeight(48),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.search, size: 20),
                label: const Text('Search Client Database'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: const Color(0xFF5B403E),
                  side: const BorderSide(color: Color(0xFFE4BEBA)),
                  minimumSize: const Size.fromHeight(48),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Recent Activity Section
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Recent Activity',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF5B403E),
                    ),
                  ),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      'View all',
                      style: TextStyle(color: Color(0xFF8D0012)),
                    ),
                  )
                ],
              ),
              const SizedBox(height: 8),

              // Activity List
              const ActivityItem(
                title: 'Global Logistics Inc.',
                subtitle: 'Survey submitted 2h ago',
                badgeText: 'NEW',
                badgeColor: Color(0xFFFFDAD7),
                badgeTextColor: Color(0xFF930013),
                icon: Icons.local_shipping,
                iconBgColor: Color(0xFFD5E0F8),
                iconColor: Color(0xFF545F73),
              ),
              const ActivityItem(
                title: 'Swift-Cargo Co.',
                subtitle: 'Follow-up scheduled for 4 PM',
                badgeText: 'PENDING',
                badgeColor: Color(0xFFD8E3FB),
                badgeTextColor: Color(0xFF3C475A),
                icon: Icons.call,
                iconBgColor: Color(0xFF80D5CB),
                iconColor: Color(0xFF00504A),
              ),
              const ActivityItem(
                title: 'Mainline Distributors',
                subtitle: 'Profile updated by Sarah',
                icon: Icons.edit_note,
                iconBgColor: Color(0xFFD3E4FE),
                iconColor: Color(0xFF5B403E),
              ),

              const SizedBox(height: 24),
              // Decorative insight Card
              ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: Stack(
                  children: [
                    Image.network(
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuAL4b92Y6zJFhIo1UiPajFQZXBYdO4vuuFaeezRAwPf5MvYCwbEscsVbAnfyMGay60J54v8YAFc-jq_glu3pI2lncCd7qPLFhDq0FUrXTs-WmhXr1262Wf82srIwuv5i9-i1YsHRwN9eMm4bwT6Rjfd0RdC8mxzuGA5byB5NTKX25cqjAVh_ioMe2HZ2gEiTb0Wae5d9D2LaQvm48oEUqm3ni5qZ32JbudyD_jnIJchoUS6fMMMD8-Hg92B-jIEWh4gi2VtaZluhng',
                      height: 160,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    ),
                    Container(
                      height: 160,
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          colors: [Colors.black54, Colors.transparent],
                          begin: Alignment.bottomCenter,
                          end: Alignment.topCenter,
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 16,
                      left: 16,
                      right: 16,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Weekly Performance Report',
                            style: GoogleFonts.hankenGrotesk(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const Text(
                            "Analyze your team's survey conversion rates.",
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 12,
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),
              const SizedBox(height: 80), // To make space for FAB
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF8D0012),
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: const Icon(Icons.add, size: 28),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        selectedItemColor: const Color(0xFF8D0012),
        unselectedItemColor: const Color(0xFF5B403E),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people),
            label: 'Clients',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.analytics),
            label: 'Analytics',
          ),
        ],
      ),
    );
  }
}

class StatsBentoGrid extends StatelessWidget {
  final String totalClients;
  final int entriesToday;
  final int pendingFollowups;

  const StatsBentoGrid({
    required this.totalClients,
    required this.entriesToday,
    required this.pendingFollowups,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          height: 140,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: const Color(0xFFE5EEFF),
            borderRadius: BorderRadius.circular(16),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'TOTAL CLIENTS',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 2.0,
                      color: Color(0xFF8D0012),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    totalClients,
                    style: GoogleFonts.hankenGrotesk(
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF0B1C30),
                    ),
                  ),
                ],
              ),
              Row(
                children: const [
                  Icon(Icons.trending_up, color: Color(0xFF00504A), size: 18),
                  SizedBox(width: 6),
                  Text(
                    '+12% from last month',
                    style: TextStyle(
                      fontSize: 12,
                      color: Color(0xFF00504A),
                      fontWeight: FontWeight.w500,
                    ),
                  )
                ],
              )
            ],
          ),
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: const Color(0x33E4BEBA)),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.today, color: Color(0xFF8D0012), size: 24),
                    const SizedBox(height: 8),
                    Text(
                      '$entriesToday',
                      style: GoogleFonts.hankenGrotesk(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      "Today's Entries",
                      style: TextStyle(fontSize: 11, color: Color(0xFF5B403E)),
                    )
                  ],
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: const Color(0x33E4BEBA)),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  cross CrossAxisAlignment.start,
                  children: [
                    const Icon(Icons.pending_actions, color: Color(0xFF004D47), size: 24),
                    const SizedBox(height: 8),
                    Text(
                      '$pendingFollowups',
                      style: GoogleFonts.hankenGrotesk(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Text(
                      'Pending Follow-ups',
                      style: TextStyle(fontSize: 11, color: Color(0xFF5B403E)),
                    )
                  ],
                ),
              ),
            ),
          ],
        )
      ],
    );
  }
}

class ActivityItem extends StatelessWidget {
  final String title;
  final String subtitle;
  final String? badgeText;
  final Color? badgeColor;
  final Color? badgeTextColor;
  final IconData icon;
  final Color iconBgColor;
  final Color iconColor;

  const ActivityItem({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.iconBgColor,
    required this.iconColor,
    this.badgeText,
    this.badgeColor,
    this.badgeTextColor,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(vertical: 8),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: Color(0x118F6F6D))),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: iconBgColor,
            radius: 20,
            child: Icon(icon, color: iconColor, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                ),
                Text(
                  subtitle,
                  style: const TextStyle(fontSize: 11, color: Color(0xFF5B403E)),
                ),
              ],
            ),
          ),
          if (badgeText != null)
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, py: 2),
              decoration: BoxDecoration(
                color: badgeColor,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                badgeText!,
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: badgeTextColor,
                ),
              ),
            )
        ],
      ),
    );
  }
}
`;

export const FLUTTER_ANALYTICS_CODE = `import 'package:flutter/material';
import 'package:google_fonts/google_fonts.dart';

class AnalyticsScreen extends StatelessWidget {
  const AnalyticsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FF),
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: const Color(0xFF8D0012),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.meeting_room, color: Colors.white, size: 18),
            ),
            const SizedBox(width: 8),
            Text(
              'Logistics Client Survey',
              style: GoogleFonts.hankenGrotesk(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF8D0012),
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.search, color: Color(0xFF5B403E)),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Analytics Overview',
              style: GoogleFonts.hankenGrotesk(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF0B1C30),
              ),
            ),
            const SizedBox(height: 4),
            const Text(
              'Real-time logistics performance and distribution metrics.',
              style: TextStyle(fontSize: 14, color: Color(0xFF5B403E)),
            ),
            const SizedBox(height: 20),

            // Bento Cards for Metrics
            Column(
              children: [
                // Card 1
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFF4FF),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Total Clients', style: TextStyle(color: Color(0xFF545F73))),
                          const SizedBox(height: 8),
                          Text(
                            '1,284',
                            style: GoogleFonts.hankenGrotesk(fontSize: 24, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: const [
                              Icon(Icons.trending_up, color: Color(0xFF006760), size: 14),
                              Text('+12% from last month', style: TextStyle(color: Color(0xFF006760), fontSize: 11)),
                            ],
                          )
                        ],
                      ),
                      const Icon(Icons.groups, color: Color(0xFF8D0012)),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                // Card 2
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFF4FF),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Avg. Volume', style: TextStyle(color: Color(0xFF545F73))),
                          const SizedBox(height: 8),
                          Text(
                            '452 /wk',
                            style: GoogleFonts.hankenGrotesk(fontSize: 24, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 4),
                          const Text('Consistent logistics demand', style: TextStyle(color: Color(0xFF5B403E), fontSize: 11)),
                        ],
                      ),
                      const Icon(Icons.unboxing_platform_rounded, color: Color(0xFF8D0012)),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                // Card 3
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFB51621),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Revenue Opportunity', style: TextStyle(color: Colors.white70)),
                          const SizedBox(height: 8),
                          Text(
                            '\\$2.4M',
                            style: GoogleFonts.hankenGrotesk(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white),
                          ),
                          const SizedBox(height: 4),
                          const Text('Estimated monthly gross', style: TextStyle(color: Colors.white70, fontSize: 11)),
                        ],
                      ),
                      const Icon(Icons.payments, color: Colors.white70),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Distribution metrics charts...
            // Implement further layout mapping here
          ],
        ),
      ),
    );
  }
}
`;

export const FLUTTER_SURVEY_CODE = `import 'package:flutter/material';
import 'package:google_fonts/google_fonts.dart';

class SurveyScreen extends StatefulWidget {
  const SurveyScreen({Key? key}) : super(key: key);

  @override
  State<SurveyScreen> createState() => _SurveyScreenState();
}

class _SurveyScreenState extends State<SurveyScreen> {
  final _formKey = GlobalKey<FormState>();
  String _clientName = '';
  String _city = 'NY';
  String _businessType = 'E-commerce';
  int _volume = 400;
  String _provider = 'SwiftTrans Logistics';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8F9FF),
      appBar: AppBar(
        title: Text('Start Logistics Survey', style: GoogleFonts.hankenGrotesk()),
        backgroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'New Survey Entry',
                style: GoogleFonts.hankenGrotesk(fontSize: 20, fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 16),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Client or Company Name',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.business),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a name';
                  }
                  return null;
                },
                onSaved: (value) => _clientName = value ?? '',
              ),
              const SizedBox(height: 16),
              // Dropdowns and form fields mapping...
            ],
          ),
        ),
      ),
    );
  }
}
`;
