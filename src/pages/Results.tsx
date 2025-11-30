import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2, Star, BadgeCheck, ChevronLeft } from "lucide-react";

const workshops = [
  {
    id: 1,
    name: "ورشة النخبة للسيارات",
    rating: 4.8,
    reviews: 156,
    cost: "2,500",
    trusted: true,
    location: "الرياض - حي الملقا"
  },
  {
    id: 2,
    name: "مركز التميز للإصلاح",
    rating: 4.7,
    reviews: 203,
    cost: "2,350",
    trusted: true,
    location: "الرياض - حي النرجس"
  },
  {
    id: 3,
    name: "ورشة الخليج المتقدمة",
    rating: 4.6,
    reviews: 98,
    cost: "2,700",
    trusted: true,
    location: "الرياض - حي العليا"
  },
];

const Results = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        {/* Liability Decision */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">قرار المسؤولية</h3>
              <div className="space-y-2">
                <p className="text-lg">
                  المسؤولية: <span className="font-bold text-primary">أمانة منطقة الرياض</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  بناءً على التحليل الذكي للصور والموقع، تم تحديد المسؤولية لأمانة المنطقة بسبب وجود حفرة طريق غير معالجة
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    دقة التحليل: 95%
                  </span>
                  <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-medium">
                    معتمد آلياً
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Workshops Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">ورش معتمدة مقترحة</h2>
            <span className="text-sm text-muted-foreground">
              {workshops.length} ورش متاحة
            </span>
          </div>

          <div className="grid gap-4">
            {workshops.map((workshop) => (
              <Card key={workshop.id} className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">{workshop.name}</h3>
                      {workshop.trusted && (
                        <span className="flex items-center gap-1 px-3 py-1 bg-gold/20 text-gold rounded-full text-xs font-medium">
                          <BadgeCheck className="h-3 w-3" />
                          موثوق
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="font-semibold">{workshop.rating}</span>
                        <span className="text-muted-foreground">({workshop.reviews} تقييم)</span>
                      </div>
                      <span className="text-muted-foreground">{workshop.location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">التكلفة التقديرية</p>
                        <p className="text-2xl font-bold text-primary">
                          {workshop.cost} <span className="text-base">ريال</span>
                        </p>
                      </div>
                      
                      <Button className="bg-primary hover:bg-primary/90">
                        اختيار الورشة
                        <ChevronLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={() => navigate("/timeline")}
            className="flex-1 bg-gold hover:bg-gold/90 text-gold-foreground text-lg py-6"
          >
            متابعة حالة البلاغ
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
