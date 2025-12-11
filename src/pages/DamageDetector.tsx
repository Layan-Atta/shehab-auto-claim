import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Camera, RefreshCw, Send, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { toast } from "sonner";
import * as tmImage from "@teachablemachine/image";

// Model URL
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/5O2NVBVDW/";

// Classification types with Arabic translations
interface ClassificationConfig {
  name: string;
  icon: string;
  colorClasses: string;
  responsibleParty: string;
}

const classificationConfig: Record<string, ClassificationConfig> = {
  "Pothole": {
    name: "حفرة في الطريق",
    icon: "🕳️",
    colorClasses: "bg-red-100 text-red-800 border-red-300",
    responsibleParty: "الأمانة / البلدية"
  },
  "Plain": {
    name: "طريق سليم",
    icon: "✅",
    colorClasses: "bg-green-100 text-green-800 border-green-300",
    responsibleParty: "لا يوجد ضرر"
  },
  "Damaged Car": {
    name: "سيارة متضررة",
    icon: "🚗💥",
    colorClasses: "bg-orange-100 text-orange-800 border-orange-300",
    responsibleParty: "شركة نجم"
  },
  "Intact Car": {
    name: "سيارة سليمة",
    icon: "🚗✨",
    colorClasses: "bg-blue-100 text-blue-800 border-blue-300",
    responsibleParty: "لا يوجد ضرر"
  }
};

interface Prediction {
  className: string;
  probability: number;
}

const DamageDetector = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [topPrediction, setTopPrediction] = useState<Prediction | null>(null);
  const [showAllPredictions, setShowAllPredictions] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Load model on component mount
  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    setIsModelLoading(true);
    setModelError(null);
    
    try {
      const modelURL = MODEL_URL + "model.json";
      const metadataURL = MODEL_URL + "metadata.json";
      
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      toast.success("تم تحميل نموذج الذكاء الاصطناعي بنجاح");
    } catch (error) {
      console.error("Error loading model:", error);
      setModelError("فشل في تحميل نموذج الذكاء الاصطناعي. يرجى تحديث الصفحة والمحاولة مرة أخرى.");
      toast.error("فشل في تحميل النموذج");
    } finally {
      setIsModelLoading(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPredictions([]);
        setTopPrediction(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const analyzeImage = async () => {
    if (!model || !imageRef.current) {
      toast.error("يرجى التأكد من تحميل النموذج وتحديد صورة");
      return;
    }

    setIsAnalyzing(true);
    setPredictions([]);
    setTopPrediction(null);

    try {
      const prediction = await model.predict(imageRef.current);
      
      // Sort by probability
      const sortedPredictions = prediction
        .map(p => ({ className: p.className, probability: p.probability }))
        .sort((a, b) => b.probability - a.probability);
      
      setPredictions(sortedPredictions);
      setTopPrediction(sortedPredictions[0]);
      toast.success("تم التحليل بنجاح");
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("فشل في تحليل الصورة");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setPredictions([]);
    setTopPrediction(null);
    setShowAllPredictions(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmitReport = () => {
    toast.success("تم إرسال البلاغ بنجاح");
    setTimeout(() => navigate("/results"), 1000);
  };

  const getConfig = (className: string): ClassificationConfig => {
    return classificationConfig[className] || {
      name: className,
      icon: "❓",
      colorClasses: "bg-gray-100 text-gray-800 border-gray-300",
      responsibleParty: "غير محدد"
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        {/* Header Section */}
        <Card className="p-6 bg-card shadow-lg text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Zap className="h-8 w-8 text-secondary" />
            <h1 className="text-3xl font-bold text-foreground">شهاب - كاشف الأضرار</h1>
          </div>
          <p className="text-lg text-muted-foreground">القاضي الرقمي الميداني</p>
        </Card>

        {/* Model Loading Status */}
        {isModelLoading && (
          <Card className="p-6 text-center space-y-4 animate-pulse">
            <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
            <p className="text-lg font-medium">جاري تحميل نموذج الذكاء الاصطناعي...</p>
          </Card>
        )}

        {/* Model Error */}
        {modelError && (
          <Card className="p-6 text-center space-y-4 border-destructive bg-destructive/10">
            <p className="text-lg font-medium text-destructive">{modelError}</p>
            <Button onClick={loadModel} variant="outline">
              <RefreshCw className="ml-2 h-4 w-4" />
              إعادة المحاولة
            </Button>
          </Card>
        )}

        {/* Image Upload Section */}
        {!isModelLoading && !modelError && (
          <Card className="p-6 space-y-6">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              ref={fileInputRef}
              className="hidden"
            />
            
            {!selectedImage ? (
              <Button
                onClick={triggerFileInput}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-8 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Camera className="ml-3 h-8 w-8" />
                📸 اختر أو التقط صورة
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt="الصورة المختارة"
                    className="w-full max-h-[400px] object-contain bg-muted"
                    crossOrigin="anonymous"
                  />
                </div>
                
                {/* Analysis Button */}
                {!topPrediction && (
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xl py-6 rounded-xl shadow-lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="ml-3 h-6 w-6 animate-spin" />
                        ⏳ جاري التحليل...
                      </>
                    ) : (
                      <>
                        🔍 تحليل الضرر بالذكاء الاصطناعي
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </Card>
        )}

        {/* Results Section */}
        {topPrediction && (
          <Card className="p-6 space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-center">نتيجة التحليل</h2>
            
            {/* Top Prediction Card */}
            {(() => {
              const config = getConfig(topPrediction.className);
              return (
                <div className={`p-6 rounded-xl border-2 ${config.colorClasses} shadow-md`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{config.icon}</span>
                    <span className="text-2xl font-bold">{config.name}</span>
                  </div>
                  
                  {/* Accuracy Progress Bar */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>نسبة الدقة</span>
                      <span className="font-bold">{(topPrediction.probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-current transition-all duration-500"
                        style={{ width: `${topPrediction.probability * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Responsible Party */}
                  <div className="flex items-center gap-2 pt-4 border-t border-current/20">
                    <span className="font-semibold">الجهة المسؤولة:</span>
                    <span>{config.responsibleParty}</span>
                  </div>
                </div>
              );
            })()}

            {/* Collapsible All Predictions */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => setShowAllPredictions(!showAllPredictions)}
                className="w-full p-4 flex items-center justify-between bg-muted hover:bg-muted/80 transition-colors"
              >
                <span className="font-semibold">عرض جميع التوقعات</span>
                {showAllPredictions ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              
              {showAllPredictions && (
                <div className="p-4 space-y-3 bg-card">
                  {predictions.map((pred, index) => {
                    const config = getConfig(pred.className);
                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${config.colorClasses} flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{config.icon}</span>
                          <span className="font-medium">{config.name}</span>
                        </div>
                        <span className="font-bold">{(pred.probability * 100).toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleSubmitReport}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl shadow-lg"
              >
                <Send className="ml-2 h-5 w-5" />
                📤 إرسال البلاغ
              </Button>
              
              <Button
                onClick={resetAnalysis}
                variant="outline"
                className="text-lg py-6 rounded-xl border-2"
              >
                <RefreshCw className="ml-2 h-5 w-5" />
                🔄 تحليل صورة جديدة
              </Button>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DamageDetector;
