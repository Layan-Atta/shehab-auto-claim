import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Clock, Circle, Home, Star, ChevronLeft, FileText } from "lucide-react";

const timelineSteps = [
  {
    id: 1,
    title: "رفع البلاغ",
    description: "تم رفع البلاغ بنجاح وتسجيل التفاصيل",
    status: "completed",
    date: "15 يناير 2025 - 09:30 ص"
  },
  {
    id: 2,
    title: "تحليل الذكاء الاصطناعي",
    description: "تم تحليل الصور وتحديد نوع الضرر والمسؤولية",
    status: "completed",
    date: "15 يناير 2025 - 09:32 ص"
  },
  {
    id: 3,
    title: "موافقة التأمين",
    description: "جاري مراجعة الطلب من قبل شركة التأمين",
    status: "current",
    date: "متوقع: 16 يناير 2025"
  },
  {
    id: 4,
    title: "التعويض والإصلاح",
    description: "سيتم التواصل مع الورشة المختارة لبدء الإصلاح",
    status: "pending",
    date: "متوقع: 18 يناير 2025"
  },
];

const workshops = [
  {
    id: 1,
    name: "ورشة النخبة للسيارات",
    location: "الرياض - حي الملقا",
    rating: 4.8,
    reviews: 156,
    estimatedCost: 2500,
    trusted: true,
  },
  {
    id: 2,
    name: "مركز التميز للإصلاح",
    location: "الرياض - حي النرجس",
    rating: 4.7,
    reviews: 203,
    estimatedCost: 2350,
    trusted: true,
  },
  {
    id: 3,
    name: "ورشة الخليج المتقدمة",
    location: "الرياض - حي العليا",
    rating: 4.6,
    reviews: 98,
    estimatedCost: 2700,
    trusted: true,
  },
];

const Timeline = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        {/* Liability Decision Card */}
        <Card className="p-6 border-2 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="flex-1 text-right space-y-3">
              <h2 className="text-xl font-bold text-primary">قرار المسؤولية</h2>
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">المسؤولية:</p>
                <p className="text-2xl font-bold text-primary">أمانة منطقة الرياض</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                بناءً على التحليل الذكي للصور والموقع، تم تحديد المسؤولية لأمانة المنطقة بسبب وجود حفرة طريق غير معالجة.
              </p>
              <div className="flex flex-wrap gap-2 justify-end">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  دقة التحليل: 95%
                </span>
                <span className="px-3 py-1 bg-gold/20 text-gold text-xs rounded-full font-medium">
                  معتمد آلياً
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText className="h-7 w-7 text-primary" />
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">تتبع حالة البلاغ</span>
            <h3 className="text-lg font-bold">رقم البلاغ: #2024-001</h3>
          </div>
          
          <div className="space-y-4">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < timelineSteps.length - 1 && (
                  <div
                    className={`absolute right-[23px] top-12 w-0.5 h-16 ${
                      step.status === "completed" ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}

                <Card className="p-4">
                  <div className="flex gap-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {step.status === "completed" ? (
                        <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                        </div>
                      ) : step.status === "current" ? (
                        <div className="h-12 w-12 bg-gold rounded-full flex items-center justify-center animate-pulse">
                          <Clock className="h-6 w-6 text-primary-foreground" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                          <Circle className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold">{step.title}</h3>
                        {step.status === "completed" && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                            مكتمل
                          </span>
                        )}
                        {step.status === "current" && (
                          <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full font-medium animate-pulse">
                            جاري
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Workshops Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{workshops.length} ورش متاحة</span>
            <h3 className="text-lg font-bold">ورش معتمدة مقترحة</h3>
          </div>

          <div className="space-y-4">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="p-4">
                <div className="space-y-3">
                  {/* Workshop Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {workshop.trusted && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          موثوق
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold text-lg">{workshop.name}</h4>
                      <p className="text-sm text-muted-foreground">{workshop.location}</p>
                    </div>
                  </div>

                  {/* Rating and Cost */}
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">التكلفة التقديرية</p>
                      <p className="text-xl font-bold text-primary">{workshop.estimatedCost.toLocaleString()} ريال</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-muted-foreground">({workshop.reviews} تقييم)</span>
                      <span className="font-bold">{workshop.rating}</span>
                      <Star className="h-4 w-4 fill-gold text-gold" />
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    اختيار الورشة
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <Button
          onClick={() => navigate("/")}
          className="w-full bg-gold hover:bg-gold/90 text-primary-foreground text-lg py-6"
        >
          متابعة حالة البلاغ
        </Button>
      </main>

      <Footer />
    </div>
  );
};

export default Timeline;
