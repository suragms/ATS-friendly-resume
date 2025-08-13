import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TrialBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Set trial end date to 14 days from now
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 14);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = trialEndDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-10"></div>
      
      <Card className="relative border-0 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left side - Trial info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  Trial Active
                </div>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-semibold">
                  <Star className="w-4 h-4" />
                  Premium Features Unlocked
                </div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your Free Trial is Running Now!
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                Experience all premium features including advanced AI suggestions, unlimited templates, 
                and professional exports. No credit card required.
              </p>
              
                             {/* Additional Paid Services Notice */}
               <div className="mb-6 p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 border border-amber-300 dark:border-amber-600 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300">
                 <a 
                   href="https://mail.google.com/mail/?view=cm&fs=1&to=officialsurag@gmail.com&su=Paid%20Resume%20Service%20Inquiry&body=Hi%2C%20I%20am%20interested%20in%20your%20paid%20resume%20service.%20Please%20provide%20more%20details%20about%20pricing%20and%20features"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block"
                 >
                   <p className="text-amber-800 dark:text-amber-200 text-sm font-medium text-center">
                     💰 <strong>Professional Resume Writing Services Available</strong> - Click here for custom CV creation and career guidance
                   </p>
                 </a>
               </div>

                             {/* Paid Resume Service Notice */}
               <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300">
                 <a 
                   href="https://mail.google.com/mail/?view=cm&fs=1&to=officialsurag@gmail.com&su=Paid%20Resume%20Service%20Inquiry&body=Hi%2C%20I%20am%20interested%20in%20your%20paid%20resume%20service.%20Please%20provide%20more%20details%20about%20pricing%20and%20features"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block"
                 >
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                       <span className="text-white text-sm font-bold">$</span>
                     </div>
                     <div>
                       <p className="text-amber-800 dark:text-amber-200 font-semibold text-lg">
                         Paid Resume or CV Available Now!
                       </p>
                       <p className="text-amber-700 dark:text-amber-300 text-sm">
                         Click here for more information
                       </p>
                     </div>
                   </div>
                 </a>
               </div>

              {/* Countdown Timer */}
              <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Trial ends in:</span>
                </div>
                <div className="flex gap-3">
                  <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-black dark:text-white">{timeLeft.days}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-black dark:text-white">{timeLeft.hours}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Hours</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-black dark:text-white">{timeLeft.minutes}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Mins</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-bold text-black dark:text-white">{timeLeft.seconds}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Secs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - CTA */}
            <div className="flex flex-col items-center lg:items-end gap-4">
              <Button 
                size="lg"
                onClick={() => navigate("/builder")}
                className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white shadow-lg text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Start Building Now
              </Button>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-right max-w-xs">
                Create unlimited resumes with all premium features during your trial period
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
