//Original Dart source code allows for future native mobile scaling

import 'package:flutter/material.dart';

void main() {
  runApp(const ShahabApp());
}

class ShahabApp extends StatelessWidget {
  const ShahabApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Shahab - شهاب',
      theme: ThemeData(
        primaryColor: const Color(0xFF005C35), // Shahab Green
        scaffoldBackgroundColor: const Color(0xFFF8F9FA),
        fontFamily: 'Cairo', // Assuming a standard Arabic font
        useMaterial3: true,
      ),
      home: const AnalysisScreen(),
    );
  }
}

// ================== Screen 1: AI Analysis ==================

class AnalysisScreen extends StatelessWidget {
  const AnalysisScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xFF005C35),
          title: Row(
            children: [
              const Icon(Icons.flash_on, color: Color(0xFFD4AF37)), // Logo placeholder
              const SizedBox(width: 8),
              const Text('شهاب', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
            ],
          ),
          actions: [
            IconButton(onPressed: () {}, icon: const Icon(Icons.person_outline, color: Colors.white)),
          ],
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              // Robot Icon
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.smart_toy_outlined, size: 40, color: Colors.blueGrey),
              ),
              const SizedBox(height: 10),
              const Text(
                'تحليل الذكاء الاصطناعي',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF2D2D2D)),
              ),
              const Text(
                'جاري تحليل الصور والبيانات',
                style: TextStyle(fontSize: 14, color: Colors.grey),
              ),
              const SizedBox(height: 30),

              // Card 1: Damage Detected
              _buildResultCard(
                title: 'تم كشف الضرر',
                value: 'صدام أمامي - الجانب الأيمن',
                borderColor: const Color(0xFF005C35), // Green
                isChecked: true,
              ),

              // Card 2: Probable Cause
              _buildResultCard(
                title: 'السبب المحتمل',
                value: 'حفرة طريق - عمق تقديري 15 سم',
                borderColor: const Color(0xFFD4AF37), // Gold
                isChecked: true,
              ),

              // Card 3: Risk Assessment
              _buildResultCard(
                title: 'تقييم الخطورة',
                value: 'متوسط - يتطلب إصلاح فوري',
                borderColor: const Color(0xFF005C35), // Green
                isChecked: true,
              ),
              
              // Card 4: Location
              _buildResultCard(
                 title: 'الموقع',
                 value: 'طريق الملك فهد - منطقة صيانة معروفة',
                 borderColor: const Color(0xFFD4AF37), // Gold
                 isChecked: true,
              ),

              const SizedBox(height: 30),
              
              // Action Button
              SizedBox(
                width: double.infinity,
                height: 55,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFC6A868), // Gold/Brown
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: () {
                    // Navigate to workshops screen
                    Navigator.push(context, MaterialPageRoute(builder: (context) => const WorkshopsScreen()));
                  },
                  child: const Text('إرسال البلاغ', style: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildResultCard({required String title, required String value, required Color borderColor, required bool isChecked}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white, // Slightly off-white/beige
        borderRadius: BorderRadius.circular(16),
        border: Border(right: BorderSide(color: borderColor, width: 4)),
        boxShadow: [BoxShadow(color: Colors.grey.withOpacity(0.1), blurRadius: 5, offset: const Offset(0, 3))],
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Spacer(),
                Text(
                  '$title ✓',
                  style: TextStyle(color: borderColor, fontWeight: FontWeight.bold, fontSize: 16),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Align(
              alignment: Alignment.center,
              child: Text(
                value,
                style: const TextStyle(fontSize: 16, color: Colors.black87),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ================== Screen 2: Workshops & Decision ==================

class WorkshopsScreen extends StatelessWidget {
  const WorkshopsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color(0xFF005C35),
          title: const Text('شهاب', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Navigator.pop(context),
          ),
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Responsibility Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('قرار المسؤولية', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: const BoxDecoration(color: Color(0xFF005C35), shape: BoxShape.circle),
                          child: const Icon(Icons.location_city, color: Colors.white),
                        )
                      ],
                    ),
                    const SizedBox(height: 10),
                    RichText(
                      text: const TextSpan(
                        style: TextStyle(fontFamily: 'Cairo', color: Colors.black87, fontSize: 16),
                        children: [
                          TextSpan(text: 'المسؤولية: '),
                          TextSpan(text: 'أمانة منطقة الرياض', style: TextStyle(color: Color(0xFF005C35), fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'بناءً على التحليل الذكي للصور والموقع، تم تحديد المسؤولية للأمانة المنطقة بسبب وجود حفرة طريق.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 13, color: Colors.grey),
                    ),
                    const SizedBox(height: 15),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildTag('دقة التحليل: 95%', Colors.green.shade100, Colors.green),
                        const SizedBox(width: 8),
                        _buildTag('معتمد آلياً', Colors.amber.shade100, Colors.amber.shade800),
                      ],
                    )
                  ],
                ),
              ),

              const SizedBox(height: 25),
              const Text('ورش معتمدة مقترحة', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              const Text('3 ورش متاحة', style: TextStyle(fontSize: 12, color: Colors.grey)),
              const SizedBox(height: 15),

              // Workshops List
              _buildWorkshopCard(
                name: 'ورشة النخبة للسيارات',
                location: 'الرياض - حي الملقا',
                rating: 4.8,
                reviews: 156,
                price: '2,500 ريال',
              ),
              _buildWorkshopCard(
                name: 'مركز التميز للإصلاح',
                location: 'الرياض - حي النرجس',
                rating: 4.7,
                reviews: 203,
                price: '2,350 ريال',
              ),
              _buildWorkshopCard(
                name: 'ورشة الخليج المتقدمة',
                location: 'الرياض - حي العليا',
                rating: 4.6,
                reviews: 98,
                price: '2,700 ريال',
              ),

              const SizedBox(height: 20),
               SizedBox(
                width: double.infinity,
                height: 55,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFC6A868),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  onPressed: () {},
                  child: const Text('متابعة حالة البلاغ', style: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTag(String text, Color bg, Color textC) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(20)),
      child: Text(text, style: TextStyle(color: textC, fontSize: 12, fontWeight: FontWeight.bold)),
    );
  }

  Widget _buildWorkshopCard({required String name, required String location, required double rating, required int reviews, required String price}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade200),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(color: Colors.amber.shade100, borderRadius: BorderRadius.circular(10)),
                child: const Text('موثوق', style: TextStyle(fontSize: 10, color: Colors.brown)),
              )
            ],
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              const Icon(Icons.star, color: Colors.amber, size: 16),
              Text(' $rating ($reviews تقييم) ', style: const TextStyle(fontSize: 12)),
              Text(location, style: const TextStyle(fontSize: 12, color: Colors.grey)),
            ],
          ),
          const SizedBox(height: 15),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF005C35),
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                ),
                onPressed: () {},
                child: const Text('اختيار الورشة', style: TextStyle(color: Colors.white)),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  const Text('التكلفة التقديرية', style: TextStyle(fontSize: 10, color: Colors.grey)),
                  Text(price, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF005C35))),
                ],
              )
            ],
          )
        ],
      ),
    );
  }
}
