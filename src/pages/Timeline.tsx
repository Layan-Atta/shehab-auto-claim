import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Clock, Circle, Home } from "lucide-react";

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

const Timeline = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        {/* Header Card */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">تتبع حالة البلاغ</h2>
              <p className="text-muted-foreground">رقم البلاغ: #2024-001</p>
            </div>
            <div className="text-left">
              <div className="text-sm text-muted-foreground mb-1">نسبة الإنجاز</div>
              <div className="text-3xl font-bold text-primary">67%</div>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <div className="space-y-6">
          {timelineSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < timelineSteps.length - 1 && (
                <div
                  className={`absolute right-[23px] top-12 w-0.5 h-20 ${
                    step.status === "completed" ? "bg-primary" : "bg-border"
                  }`}
                />
              )}

              <Card className="p-5">
                <div className="flex gap-4">
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {step.status === "completed" ? (
                      <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
                      </div>
                    ) : step.status === "current" ? (
                      <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center animate-pulse">
                        <Clock className="h-6 w-6 text-secondary-foreground" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      {step.status === "completed" && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          مكتمل
                        </span>
                      )}
                      {step.status === "current" && (
                        <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-medium animate-pulse">
                          جاري المعالجة
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{step.description}</p>
                    <p className="text-sm text-muted-foreground">{step.date}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Actions */}
        <Card className="p-6 bg-muted/50">
          <h3 className="font-bold mb-4">هل تحتاج مساعدة؟</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex-1">
              تحديث المعلومات
            </Button>
            <Button variant="outline" className="flex-1">
              التواصل مع الدعم
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Home className="ml-2 h-4 w-4" />
              العودة للرئيسية
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Timeline;
