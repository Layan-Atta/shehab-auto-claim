import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Clock, FileText, Zap } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-8 md:p-12 shadow-xl">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              أتمتة الحوادث.. لعدالة أسرع
            </h2>
            <p className="text-lg opacity-90">
              نظام ذكي لمعالجة حوادث المركبات الفردية تلقائياً
            </p>
          </div>
        </Card>

        {/* Main Actions */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-8">
          <Button
            onClick={() => navigate("/report")}
            size="lg"
            className="bg-gold hover:bg-gold/90 text-gold-foreground text-xl px-12 py-8 rounded-2xl shadow-2xl animate-pulse-slow transition-transform hover:scale-105"
          >
            <FileText className="ml-3 h-8 w-8" />
            بلاغ حادث فردي جديد
          </Button>
          
          <Button
            onClick={() => navigate("/damage-detector")}
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xl px-12 py-8 rounded-2xl shadow-xl transition-transform hover:scale-105"
          >
            <Zap className="ml-3 h-8 w-8" />
            كاشف الأضرار بالذكاء الاصطناعي
          </Button>
        </div>

        {/* Active Claims */}
        <Card className="p-6 bg-card shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            البلاغات النشطة
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <div className="mt-1">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-lg">بلاغ #2024-001</p>
                    <p className="text-sm text-muted-foreground">تاريخ الإنشاء: 15 يناير 2025</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/timeline")}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    عرض التفاصيل
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 bg-background rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full w-2/3 transition-all"></div>
                  </div>
                  <span className="text-sm font-medium">67%</span>
                </div>
                
                <p className="text-sm mt-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                  حالة الطلب: <span className="font-semibold">جاري المعالجة</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg opacity-60">
              <div className="mt-1">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-lg">بلاغ #2024-002</p>
                    <p className="text-sm text-muted-foreground">تاريخ الإنشاء: 10 يناير 2025</p>
                  </div>
                  <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    مكتمل
                  </span>
                </div>
                
                <p className="text-sm mt-2 flex items-center gap-2">
                  تم التعويض والإصلاح بنجاح
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
