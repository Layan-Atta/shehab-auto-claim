import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Report = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [carImage, setCarImage] = useState(false);
  const [roadImage, setRoadImage] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleImageUpload = (type: 'car' | 'road') => {
    if (type === 'car') {
      setCarImage(true);
      toast.success("تم رفع صورة المركبة بنجاح");
    } else {
      setRoadImage(true);
      toast.success("تم رفع صورة الطريق بنجاح");
      
      // Trigger AI analysis
      setTimeout(() => {
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          setShowAnalysis(true);
        }, 2500);
      }, 500);
    }
  };

  const handleSubmit = () => {
    toast.success("تم رفع البلاغ بنجاح");
    setTimeout(() => navigate("/results"), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        {/* Progress Indicator */}
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-20 rounded-full transition-all ${
                s <= step ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Location */}
        {step === 1 && (
          <Card className="p-6 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">تحديد موقع الحادث</h2>
              <p className="text-muted-foreground">حدد موقع الحادث على الخريطة</p>
            </div>

            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
              <div className="relative z-10 text-center space-y-3">
                <MapPin className="h-16 w-16 text-primary mx-auto" />
                <p className="text-lg font-semibold">الرياض، طريق الملك فهد</p>
                <p className="text-sm text-muted-foreground">24.7136° N, 46.6753° E</p>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            >
              تأكيد الموقع والمتابعة
            </Button>
          </Card>
        )}

        {/* Step 2: Evidence Upload */}
        {step === 2 && (
          <Card className="p-6 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Upload className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">رفع الأدلة</h2>
              <p className="text-muted-foreground">قم برفع صور الحادث للتحليل</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Car Image Upload */}
              <div
                onClick={() => !carImage && handleImageUpload('car')}
                className={`aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                  carImage
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary hover:bg-muted'
                }`}
              >
                {carImage ? (
                  <>
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                    <p className="font-semibold">صورة المركبة</p>
                    <p className="text-sm text-muted-foreground">تم الرفع بنجاح</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="font-semibold">صورة المركبة</p>
                    <p className="text-sm text-muted-foreground">اضغط للرفع</p>
                  </>
                )}
              </div>

              {/* Road Image Upload */}
              <div
                onClick={() => !roadImage && handleImageUpload('road')}
                className={`aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                  roadImage
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary hover:bg-muted'
                }`}
              >
                {roadImage ? (
                  <>
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                    <p className="font-semibold">صورة الطريق/الحفرة</p>
                    <p className="text-sm text-muted-foreground">تم الرفع بنجاح</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="font-semibold">صورة الطريق/الحفرة</p>
                    <p className="text-sm text-muted-foreground">اضغط للرفع</p>
                  </>
                )}
              </div>
            </div>

            <Button
              onClick={() => setStep(3)}
              disabled={!carImage || !roadImage}
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            >
              المتابعة للتحليل
            </Button>
          </Card>
        )}

        {/* Step 3: AI Analysis */}
        {step === 3 && (
          <Card className="p-6 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold">تحليل الذكاء الاصطناعي</h2>
              <p className="text-muted-foreground">جاري تحليل الصور والبيانات</p>
            </div>

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <p className="text-lg font-medium">جاري المسح والتحليل...</p>
              </div>
            )}

            {showAnalysis && !isAnalyzing && (
              <div className="space-y-4 animate-fade-in">
                <div className="p-4 bg-primary/5 border-r-4 border-primary rounded-lg animate-scan">
                  <p className="font-semibold text-primary mb-1">✓ تم كشف الضرر</p>
                  <p className="text-sm">صدام أمامي - الجانب الأيمن</p>
                </div>

                <div className="p-4 bg-secondary/10 border-r-4 border-secondary rounded-lg animate-scan" style={{ animationDelay: '0.3s' }}>
                  <p className="font-semibold text-secondary mb-1">✓ السبب المحتمل</p>
                  <p className="text-sm">حفرة طريق - عمق تقديري 15 سم</p>
                </div>

                <div className="p-4 bg-primary/5 border-r-4 border-primary rounded-lg animate-scan" style={{ animationDelay: '0.6s' }}>
                  <p className="font-semibold text-primary mb-1">✓ تقييم الخطورة</p>
                  <p className="text-sm">متوسط - يتطلب إصلاح فوري</p>
                </div>

                <div className="p-4 bg-secondary/10 border-r-4 border-secondary rounded-lg animate-scan" style={{ animationDelay: '0.9s' }}>
                  <p className="font-semibold text-secondary mb-1">✓ الموقع</p>
                  <p className="text-sm">طريق الملك فهد - منطقة صيانة معروفة</p>
                </div>
              </div>
            )}

            {showAnalysis && (
              <Button
                onClick={handleSubmit}
                className="w-full bg-gold hover:bg-gold/90 text-gold-foreground text-lg py-6"
              >
                إرسال البلاغ
              </Button>
            )}
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Report;
