import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Upload, CheckCircle2, ArrowRight, Calendar, FileText, Send, Image, Car, Route } from "lucide-react";
import { toast } from "sonner";

interface ReportData {
  carImage: string | null;
  roadImage: string | null;
  description: string;
  location: string;
  dateTime: string;
}

const analysisSteps = [
  { id: 1, title: "تم كشف الضرر", description: "صدام أمامي - الجانب الأيمن", delay: 500 },
  { id: 2, title: "السبب المحتمل", description: "حفرة طريق - عمق تقديري 15 سم", delay: 1200 },
  { id: 3, title: "تقييم الخطورة", description: "متوسط - يتطلب إصلاح فوري", delay: 1900 },
  { id: 4, title: "تحديد المسؤولية", description: "أمانة منطقة الرياض", delay: 2600 },
  { id: 5, title: "الموقع", description: "طريق الملك فهد - منطقة صيانة معروفة", delay: 3300 },
];

const Report = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [visibleAnalysisSteps, setVisibleAnalysisSteps] = useState<number[]>([]);
  
  const carInputRef = useRef<HTMLInputElement>(null);
  const roadInputRef = useRef<HTMLInputElement>(null);

  const [reportData, setReportData] = useState<ReportData>({
    carImage: null,
    roadImage: null,
    description: "",
    location: "",
    dateTime: new Date().toISOString().slice(0, 16),
  });

  const steps = [
    { title: "تحديد الموقع", icon: MapPin },
    { title: "رفع الأدلة", icon: Upload },
    { title: "تفاصيل الحادث", icon: FileText },
    { title: "المراجعة والإرسال", icon: Send },
  ];

  const handleImageUpload = (type: 'car' | 'road', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'car') {
          setReportData(prev => ({ ...prev, carImage: result }));
          toast.success("تم رفع صورة المركبة بنجاح");
        } else {
          setReportData(prev => ({ ...prev, roadImage: result }));
          toast.success("تم رفع صورة الطريق بنجاح");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setVisibleAnalysisSteps([]);
    setAnalysisComplete(false);

    // Show analysis steps one by one
    analysisSteps.forEach((analysisStep) => {
      setTimeout(() => {
        setVisibleAnalysisSteps(prev => [...prev, analysisStep.id]);
      }, analysisStep.delay);
    });

    // Complete analysis after all steps
    setTimeout(() => {
      setAnalysisComplete(true);
    }, 4000);
  };

  const handleSubmit = () => {
    // Save to localStorage
    const reports = JSON.parse(localStorage.getItem('shehab_reports') || '[]');
    const newReport = {
      id: Date.now(),
      ...reportData,
      status: 'processing',
      submittedAt: new Date().toISOString(),
    };
    reports.push(newReport);
    localStorage.setItem('shehab_reports', JSON.stringify(reports));
    
    setIsSubmitted(true);
    toast.success("✅ تم إرسال البلاغ بنجاح!");
  };

  const canProceedStep1 = true; // Location step always can proceed
  const canProceedStep2 = reportData.carImage || reportData.roadImage;
  const canProceedStep3 = reportData.description.trim() !== "" && reportData.location.trim() !== "";

  const goToNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const goToPreviousStep = () => {
    if (step > 0) setStep(step - 1);
  };

  // AI Analysis View
  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
          {/* Progress Bar */}
          <div className="flex gap-2 justify-center mb-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 w-24 rounded-full ${i <= 3 ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>

          <Card className="p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-3xl">🤖</span>
              </div>
              <h2 className="text-2xl font-bold">تحليل الذكاء الاصطناعي</h2>
              <p className="text-muted-foreground">
                {analysisComplete ? "تم اكتمال التحليل" : "جاري تحليل الصور والبيانات"}
              </p>
            </div>

            {/* Analysis Steps */}
            <div className="space-y-4">
              {analysisSteps.map((analysisStep) => {
                const isVisible = visibleAnalysisSteps.includes(analysisStep.id);
                return (
                  <div
                    key={analysisStep.id}
                    className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                      isVisible
                        ? 'bg-gradient-to-l from-gold/10 to-gold/5 border-gold/30 opacity-100 translate-x-0'
                        : 'bg-muted/30 border-muted opacity-40 translate-x-4'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{analysisStep.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${isVisible ? 'text-gold' : 'text-muted-foreground'}`}>
                          {isVisible ? '✓' : '○'} {analysisStep.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Button */}
            <Button
              onClick={() => {
                handleSubmit();
                navigate("/timeline");
              }}
              disabled={!analysisComplete}
              className="w-full bg-gold hover:bg-gold/90 text-primary-foreground text-lg py-6"
            >
              {analysisComplete ? "متابعة حالة البلاغ" : "⏳ جاري التحليل..."}
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="p-8 text-center space-y-6 max-w-md w-full animate-fade-in">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary">✅ تم إرسال البلاغ بنجاح!</h2>
            <p className="text-muted-foreground">
              سيتم مراجعة بلاغك وتحليله بواسطة الذكاء الاصطناعي. يمكنك متابعة حالة البلاغ من صفحة المتابعة.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate("/timeline")}
                className="w-full bg-primary hover:bg-primary/90"
              >
                متابعة حالة البلاغ
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="w-full"
              >
                العودة للرئيسية
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4 hover:bg-muted"
        >
          <ArrowRight className="h-4 w-4 ml-2" />
          رجوع للرئيسية
        </Button>

        {/* Page Title */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-primary">تقديم بلاغ حادث فردي</h1>
          <p className="text-muted-foreground">قم بإكمال الخطوات التالية لتقديم بلاغك</p>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-8 px-4">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                    index < step
                      ? 'bg-primary text-primary-foreground'
                      : index === step
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {index < step ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <s.icon className="h-5 w-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      index < step ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
              <span className={`text-xs mt-2 text-center ${
                index <= step ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step 0: Location */}
        {step === 0 && (
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
              onClick={goToNextStep}
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            >
              تأكيد الموقع والمتابعة
            </Button>
          </Card>
        )}

        {/* Step 1: Evidence Upload */}
        {step === 1 && (
          <Card className="p-6 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Upload className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">رفع الأدلة</h2>
              <p className="text-muted-foreground">قم برفع صور الحادث (صورة واحدة على الأقل)</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Car Image Upload */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-lg font-semibold">
                  <Car className="h-5 w-5" />
                  🚗 صورة المركبة
                </Label>
                <input
                  ref={carInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleImageUpload('car', e)}
                />
                <div
                  onClick={() => carInputRef.current?.click()}
                  className={`aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 transition-all cursor-pointer overflow-hidden ${
                    reportData.carImage
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary hover:bg-muted'
                  }`}
                >
                  {reportData.carImage ? (
                    <img 
                      src={reportData.carImage} 
                      alt="صورة المركبة" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Image className="h-12 w-12 text-muted-foreground" />
                      <p className="font-semibold">اضغط للرفع</p>
                      <p className="text-sm text-muted-foreground">أو التقط صورة</p>
                    </>
                  )}
                </div>
                {reportData.carImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReportData(prev => ({ ...prev, carImage: null }))}
                    className="w-full"
                  >
                    إزالة الصورة
                  </Button>
                )}
              </div>

              {/* Road Image Upload */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-lg font-semibold">
                  <Route className="h-5 w-5" />
                  🛣️ صورة الطريق/الحفرة
                </Label>
                <input
                  ref={roadInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleImageUpload('road', e)}
                />
                <div
                  onClick={() => roadInputRef.current?.click()}
                  className={`aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 transition-all cursor-pointer overflow-hidden ${
                    reportData.roadImage
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary hover:bg-muted'
                  }`}
                >
                  {reportData.roadImage ? (
                    <img 
                      src={reportData.roadImage} 
                      alt="صورة الطريق" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Image className="h-12 w-12 text-muted-foreground" />
                      <p className="font-semibold">اضغط للرفع</p>
                      <p className="text-sm text-muted-foreground">أو التقط صورة</p>
                    </>
                  )}
                </div>
                {reportData.roadImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReportData(prev => ({ ...prev, roadImage: null }))}
                    className="w-full"
                  >
                    إزالة الصورة
                  </Button>
                )}
              </div>
            </div>

            {!canProceedStep2 && (
              <p className="text-center text-amber-600 text-sm">
                ⚠️ يجب رفع صورة واحدة على الأقل للمتابعة
              </p>
            )}

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                className="flex-1"
              >
                السابق
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={!canProceedStep2}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                التالي
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Accident Details */}
        {step === 2 && (
          <Card className="p-6 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <FileText className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">تفاصيل الحادث</h2>
              <p className="text-muted-foreground">أدخل تفاصيل الحادث</p>
            </div>

            <div className="space-y-6">
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-semibold">
                  📝 وصف الحادث
                </Label>
                <Textarea
                  id="description"
                  placeholder="اكتب وصفاً تفصيلياً للحادث..."
                  value={reportData.description}
                  onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px] text-right"
                  dir="rtl"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-lg font-semibold">
                  📍 الموقع
                </Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="أدخل عنوان الموقع..."
                    value={reportData.location}
                    onChange={(e) => setReportData(prev => ({ ...prev, location: e.target.value }))}
                    className="pr-10 text-right"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <Label htmlFor="datetime" className="text-lg font-semibold">
                  📅 التاريخ والوقت
                </Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="datetime"
                    type="datetime-local"
                    value={reportData.dateTime}
                    onChange={(e) => setReportData(prev => ({ ...prev, dateTime: e.target.value }))}
                    className="pr-10"
                  />
                </div>
              </div>
            </div>

            {!canProceedStep3 && (
              <p className="text-center text-amber-600 text-sm">
                ⚠️ يجب ملء وصف الحادث والموقع للمتابعة
              </p>
            )}

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                className="flex-1"
              >
                السابق
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={!canProceedStep3}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                التالي
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <Card className="p-6 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Send className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">المراجعة والإرسال</h2>
              <p className="text-muted-foreground">راجع بيانات البلاغ قبل الإرسال</p>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              {/* Images Summary */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h3 className="font-semibold text-primary flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  الصور المرفقة
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {reportData.carImage && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">صورة المركبة</p>
                      <img 
                        src={reportData.carImage} 
                        alt="صورة المركبة" 
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  {reportData.roadImage && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">صورة الطريق</p>
                      <img 
                        src={reportData.roadImage} 
                        alt="صورة الطريق" 
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Details Summary */}
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <h3 className="font-semibold text-primary flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  تفاصيل الحادث
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">وصف الحادث:</span>
                    <span className="font-medium max-w-[60%] text-left">{reportData.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الموقع:</span>
                    <span className="font-medium">{reportData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">التاريخ والوقت:</span>
                    <span className="font-medium" dir="ltr">
                      {new Date(reportData.dateTime).toLocaleString('ar-SA')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                className="flex-1"
              >
                السابق
              </Button>
              <Button
                onClick={startAnalysis}
                className="flex-1 bg-gold hover:bg-gold/90 text-primary-foreground text-lg py-6"
              >
                📤 إرسال البلاغ
              </Button>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Report;
