import React, { useState, useRef, useEffect } from 'react';
import { 
  Truck, Package, Camera, MapPin, Users, FileText, CheckCircle, Clock, 
  Home, Briefcase, User, ChevronRight, AlertCircle, X, ChevronLeft, 
  Plus, Check, Image as ImageIcon, Navigation, Phone, MessageSquare,
  FileSpreadsheet, Download, MoreVertical, CreditCard, PieChart
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// -- PHONE FRAME WRAPPER --
function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-[390px] h-[844px] bg-porter-bg rounded-[3rem] overflow-hidden shadow-2xl ring-8 ring-gray-900 shadow-gray-900/50 flex flex-col">
        {/* Notch & Status Bar */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
          <div className="w-[120px] h-6 bg-gray-900 rounded-b-3xl"></div>
        </div>
        <div className="absolute top-2 inset-x-6 flex justify-between items-center text-[11px] font-medium z-50 mix-blend-difference text-white">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-3 rounded-[2px] border border-current relative">
               <div className="absolute inset-[1px] bg-current w-2.5 rounded-[1px]" />
               <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-current rounded-r-[1px]" />
            </div>
          </div>
        </div>
        
        {/* Screen Content */}
        <div className="flex-1 overflow-hidden flex flex-col relative mt-8">
          {children}
        </div>
      </div>
    </div>
  );
}

// -- MAIN APP COMPONENT --
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [viewStack, setViewStack] = useState([{ tab: 'home', view: 'home_main' }]);
  
  const currentViewState = viewStack[viewStack.length - 1];

  const pushView = (tab, view, data = {}) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setViewStack([{ tab, view, data }]);
    } else {
      setViewStack([...viewStack, { tab, view, data }]);
    }
  };

  const popView = () => {
    if (viewStack.length > 1) {
      const newStack = [...viewStack];
      newStack.pop();
      setViewStack(newStack);
      setActiveTab(newStack[newStack.length - 1].tab);
    }
  };

  const setTab = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setViewStack([{ tab, view: `${tab}_main` }]);
    } else {
      // pop to root of tab
      setViewStack([{ tab, view: `${tab}_main` }]);
    }
  };

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar relative">
        {currentViewState.tab === 'home' && (
          <HomeTab view={currentViewState.view} data={currentViewState.data} pushView={pushView} popView={popView} />
        )}
        {currentViewState.tab === 'bookings' && (
          <div className="p-4 flex items-center justify-center h-full text-gray-400">Bookings Content Placeholder</div>
        )}
        {currentViewState.tab === 'business' && (
          <BusinessTab view={currentViewState.view} data={currentViewState.data} pushView={pushView} popView={popView} />
        )}
        {currentViewState.tab === 'profile' && (
          <div className="p-4 flex items-center justify-center h-full text-gray-400">Profile Content Placeholder</div>
        )}
      </div>
      
      {/* Bottom Tab Bar */}
      <div className="absolute bottom-0 inset-x-0 h-[84px] bg-white border-t border-gray-100 flex justify-around items-start pt-3 pb-8 px-2 z-40 rounded-b-[2.5rem]">
        <TabButton icon={<Home size={24} />} label="Home" active={activeTab === 'home'} onClick={() => setTab('home')} />
        <TabButton icon={<FileText size={24} />} label="Bookings" active={activeTab === 'bookings'} onClick={() => setTab('bookings')} />
        <TabButton icon={<Briefcase size={24} />} label="Business" active={activeTab === 'business'} onClick={() => setTab('business')} />
        <TabButton icon={<User size={24} />} label="Profile" active={activeTab === 'profile'} onClick={() => setTab('profile')} />
      </div>
    </PhoneFrame>
  );
}

function TabButton({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={cn("flex flex-col items-center gap-1 w-16 transition-colors", active ? "text-porter-primary font-semibold" : "text-gray-400 font-medium")}>
      <div className={cn("transition-transform", active ? "scale-110" : "")}>
        {icon}
      </div>
      <span className="text-[10px]">{label}</span>
    </button>
  );
}

// ==========================================
// MODULE 1: IN-APP DELIVERY ISSUE RESOLUTION
// ==========================================

function HomeTab({ view, data, pushView, popView }) {
  if (view === 'home_main') {
    return (
      <div className="min-h-full bg-porter-bg pb-6">
        <div className="bg-porter-dark text-white p-6 pt-10 rounded-b-3xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-400 text-sm">Welcome back,</p>
              <h1 className="text-2xl font-bold">Rohan Sharma</h1>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
          <div className="bg-porter-primary text-porter-dark p-4 rounded-xl flex items-center justify-between font-medium">
            <div className="flex items-center gap-2">
              <Truck size={20} />
              <span>Book a ride now</span>
            </div>
            <ChevronRight size={20} />
          </div>
        </div>

        <div className="p-4 mt-2">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Recent Deliveries</h2>
          {/* Mock recent booking */}
          <div 
            onClick={() => pushView('home', 'booking_details', { id: 'CRN-892401' })}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer"
          >
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Completed today, 10:42 AM</h3>
                <p className="text-sm text-gray-500">Tata Ace • Koramangala to HSR</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  if (view === 'booking_details') {
    return <BookingDetails popView={popView} pushView={pushView} data={data} />;
  }

  if (view === 'issue_wizard') {
    return <IssueWizard popView={popView} pushView={pushView} data={data} />;
  }
  
  if (view === 'issue_tracker') {
    return <IssueTracker popView={popView} data={data} />;
  }

  return null;
}

function BookingDetails({ popView, pushView, data }) {
  return (
    <div className="min-h-full bg-porter-bg flex flex-col">
      <div className="bg-white p-4 pt-10 sticky top-0 z-10 border-b border-gray-100 flex items-center gap-3">
        <button onClick={popView} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ChevronLeft size={24} /></button>
        <h1 className="text-lg font-bold">Booking {data.id}</h1>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Map Mock */}
        <div className="bg-gray-200 h-40 rounded-2xl w-full overflow-hidden relative">
          <div className="absolute inset-0 opacity-50 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Bangalore&zoom=12&size=400x400')] bg-cover bg-center"></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-porter-dark rounded-full border-2 border-white"></div>
          <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-porter-primary rounded-full border-2 border-white"></div>
          <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'}}>
             <path d="M 100 80 Q 200 60 290 65" fill="none" stroke="#1C2B39" strokeWidth="4" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm space-y-4">
           <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
               <Truck className="text-gray-500" />
               <span className="font-semibold text-gray-800">Tata Ace</span>
             </div>
             <span className="text-sm font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">Completed</span>
           </div>
           
           <div className="relative pl-6 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-200">
             <div className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-gray-400 ring-4 ring-white" />
                <p className="text-sm font-medium text-gray-900">Koramangala 4th Block</p>
                <p className="text-xs text-gray-500">10:12 AM</p>
             </div>
             <div className="relative">
                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-porter-dark ring-4 ring-white" />
                <p className="text-sm font-medium text-gray-900">HSR Layout Sector 2</p>
                <p className="text-xs text-gray-500">10:42 AM</p>
             </div>
           </div>
        </div>

        <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
          <div className="flex items-start gap-3">
             <div className="mt-0.5 text-red-500"><AlertCircle size={20} /></div>
             <div>
               <h3 className="font-bold text-red-800">Need help with this trip?</h3>
               <p className="text-sm text-red-600 mt-1 mb-3">You have 18h 32m remaining to report an issue for this delivery.</p>
               <button 
                 onClick={() => pushView('home', 'issue_wizard', { id: data.id })}
                 className="bg-white text-red-600 border border-red-200 font-bold py-2 px-4 rounded-lg w-full active:bg-red-50 transition-colors"
               >
                 Report an Issue
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IssueWizard({ popView, pushView, data }) {
  const [step, setStep] = useState(1); // 1: Type, 2: Details, 3: Review
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  
  const issueTypes = ['Damaged Goods', 'Delayed Delivery', 'Unprofessional Behavior', 'Missing Item', 'Other'];

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotos([...photos, url]);
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const submitClaim = () => {
    const ticketId = 'PRT-CLM-' + Math.floor(100000 + Math.random() * 900000);
    // Push tracking view
    popView(); // pop wizard
    pushView('home', 'issue_tracker', { id: data.id, ticketId, issueType, photos });
  };

  return (
    <div className="min-h-full bg-white flex flex-col absolute inset-0 z-50">
      <div className="p-4 pt-10 sticky top-0 bg-white border-b border-gray-100 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <button onClick={step === 1 ? popView : () => setStep(step - 1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">Report Issue</h1>
        </div>
        {/* Progress dots */}
        <div className="flex gap-2 items-center px-2">
           {[1, 2, 3].map(s => (
             <div key={s} className={cn("h-1.5 flex-1 rounded-full transition-colors", s <= step ? "bg-porter-dark" : "bg-gray-200")} />
           ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {step === 1 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold mb-4">What went wrong?</h2>
            <div className="space-y-3">
              {issueTypes.map(type => (
                <button 
                  key={type}
                  onClick={() => setIssueType(type)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all font-semibold flex justify-between items-center",
                    issueType === type ? "border-porter-dark bg-gray-50" : "border-gray-100 bg-white"
                  )}
                >
                  {type}
                  {issueType === type && <CheckCircle className="text-porter-dark" size={20} />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold mb-4">Provide details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the issue in detail..."
                  className="w-full border-2 border-gray-100 rounded-xl p-3 focus:outline-none focus:border-porter-dark h-32 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Photos (Optional)</label>
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                      <img src={url} alt="upload" className="w-full h-full object-cover" />
                      <button onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-gray-900/50 text-white rounded-full p-1 backdrop-blur-sm">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors">
                    <Camera size={24} className="mb-1" />
                    <span className="text-xs font-semibold">Add Photo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <h2 className="text-xl font-bold mb-4">Review Claim</h2>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-4">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Issue Type</p>
                <p className="font-bold text-gray-900">{issueType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Description</p>
                <p className="text-gray-800 text-sm">{description || "No description provided."}</p>
              </div>
              {photos.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Attached Photos</p>
                  <div className="flex gap-2">
                    {photos.map((url, i) => (
                      <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <img src={url} alt="attached" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 text-sm">
              <Clock className="shrink-0 text-blue-600" size={20} />
              <p>Your claim will be reviewed by our team. We maintain a <strong>72-hour first-response SLA</strong> for resolution.</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0">
        {step < 3 ? (
          <button 
            disabled={step === 1 && !issueType}
            onClick={() => setStep(step + 1)}
            className="w-full bg-porter-dark text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:active:scale-100 active:scale-[0.98] transition-all"
          >
            Next
          </button>
        ) : (
          <button 
            onClick={submitClaim}
            className="w-full bg-porter-primary text-porter-dark font-bold py-4 rounded-xl active:scale-[0.98] transition-transform text-lg"
          >
            Submit Claim
          </button>
        )}
      </div>
    </div>
  );
}

function IssueTracker({ popView, data }) {
  const [trackerStep, setTrackerStep] = useState(1); // 1: Received, 2: Review, 3: Resolution, 4: Resolved

  const steps = [
    { label: 'Claim Received', time: 'Just now' },
    { label: 'Under Review', time: 'Expected in 24h' },
    { label: 'Resolution Offered', time: 'Pending' },
    { label: 'Resolved', time: 'Pending' }
  ];

  return (
    <div className="min-h-full bg-porter-bg flex flex-col absolute inset-0 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-porter-dark text-white p-4 pt-10 sticky top-0 flex items-center gap-3 shadow-md z-10">
        <button onClick={popView} className="p-2 -ml-2 rounded-full hover:bg-white/10"><ChevronLeft size={24} /></button>
        <div>
          <h1 className="text-lg font-bold">Ticket {data.ticketId}</h1>
          <p className="text-xs text-porter-primary/90">{data.issueType}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Status Stepper */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
             <h2 className="font-bold text-gray-800">Status</h2>
             <button onClick={() => setTrackerStep(prev => prev < 4 ? prev + 1 : 1)} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold tracking-wider uppercase">Simulate Time</button>
          </div>
          
          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
            {steps.map((s, i) => {
              const isCompleted = trackerStep > i;
              const isCurrent = trackerStep === i + 1;
              const isFuture = trackerStep <= i;

              return (
                <div key={i} className={cn("relative transition-opacity duration-300", isFuture ? "opacity-50" : "opacity-100")}>
                  <div className={cn(
                    "absolute -left-[28.5px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white z-10 transition-colors",
                    isCompleted ? "bg-porter-dark text-white" : isCurrent ? "bg-porter-primary text-porter-dark" : "bg-gray-200"
                  )}>
                    {isCompleted ? <Check size={12} strokeWidth={4} /> : <div className={cn("w-2 h-2 rounded-full", isCurrent ? "bg-porter-dark" : "bg-white")} />}
                  </div>
                  <div>
                    <p className={cn("text-sm font-bold", isCurrent ? "text-porter-dark" : "text-gray-700")}>{s.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Thread */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <h2 className="font-bold text-gray-800">Updates</h2>
          
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
               <User size={16} className="text-gray-500" />
             </div>
             <div className="bg-gray-50 rounded-2xl rounded-tl-none p-3 text-sm text-gray-800 border border-gray-100">
               <p>Claim submitted for <strong>{data.issueType}</strong>.</p>
               {data.photos && data.photos.length > 0 && (
                 <div className="flex gap-2 mt-2">
                   {data.photos.map((p, i) => <img key={i} src={p} className="w-12 h-12 rounded border border-gray-200 object-cover" />)}
                 </div>
               )}
             </div>
          </div>

          <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both">
             <div className="w-8 h-8 rounded-full bg-porter-dark flex items-center justify-center shrink-0">
               <div className="w-4 h-4 bg-porter-primary rounded-sm" /> {/* Fake logo */}
             </div>
             <div className="bg-porter-bg rounded-2xl rounded-tl-none p-3 text-sm text-gray-800 border border-gray-200">
               <p>Hi Rohan, we have received your claim. A resolution expert will be assigned shortly and review your details within 24 hours.</p>
             </div>
          </div>
          
          {trackerStep > 1 && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="w-8 h-8 rounded-full bg-porter-dark flex items-center justify-center shrink-0">
                 <div className="w-4 h-4 bg-porter-primary rounded-sm" />
               </div>
               <div className="bg-porter-bg rounded-2xl rounded-tl-none p-3 text-sm text-gray-800 border border-gray-200">
                 <p>Your case is now under review. We are checking the driver logs and route details.</p>
               </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative">
          <input type="text" placeholder="Type a message..." className="w-full bg-gray-100 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-porter-dark/20" />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-porter-dark text-white rounded-full flex items-center justify-center">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MODULE 2: PORTER FOR BUSINESS LITE TIER
// ==========================================

function BusinessTab({ view, data, pushView, popView }) {
  const [unlocked, setUnlocked] = useState(false);

  // MOCK STATE FOR DEMO
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Main Warehouse', tag: 'Warehouse', text: 'Peenya Industrial Area, Phase 2' },
    { id: 2, label: 'City Hub', tag: 'Hub', text: 'Indiranagar 100ft Road' }
  ]);
  const [pickups, setPickups] = useState([
    { id: 1, from: 'Main Warehouse', to: 'City Hub', freq: 'Daily', vehicle: 'Tata Ace', time: '10:00 AM', active: true }
  ]);
  const [team, setTeam] = useState([
    { id: 1, email: 'rohan@mycompany.com', role: 'Admin', status: 'Active' },
    { id: 2, email: 'warehouse@mycompany.com', role: 'Booker', status: 'Active' }
  ]);

  if (!unlocked) {
    return (
      <div className="min-h-full bg-porter-bg flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
          <Briefcase size={32} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Porter for Business</h1>
        <p className="text-gray-500 mb-8">Unlock powerful tools for your business by completing a few more trips this month.</p>
        
        <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-left mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="font-bold text-gray-800">6 of 8 bookings</span>
            <span className="text-xs font-bold text-porter-primary bg-porter-dark px-2 py-1 rounded">2 left</span>
          </div>
          <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-porter-primary rounded-full transition-all duration-1000 w-[75%]" />
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">Complete 2 more trips to automatically unlock.</p>
        </div>

        <button 
          onClick={() => setUnlocked(true)}
          className="text-xs font-bold text-gray-400 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100"
        >
          [Dev Toggle] Simulate: Unlocked
        </button>
      </div>
    );
  }

  // --- UNLOCKED VIEWS ---
  
  if (view === 'business_main') {
    const sparklineData = [
      { name: 'W1', spend: 4000 },
      { name: 'W2', spend: 3000 },
      { name: 'W3', spend: 5500 },
      { name: 'W4', spend: 8200 },
    ];

    return (
      <div className="min-h-full bg-porter-bg pb-6">
        <div className="bg-porter-dark text-white p-6 pt-10 rounded-b-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Briefcase size={120} /></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <p className="text-gray-400 text-sm">Business Dashboard</p>
              <h1 className="text-2xl font-bold flex items-center gap-2">MyCompany Pvt Ltd <span className="bg-porter-primary text-porter-dark text-[10px] uppercase px-1.5 py-0.5 rounded font-black tracking-wider">Lite</span></h1>
            </div>
          </div>
          
          {/* Spend Summary */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl relative z-10 mt-2">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-gray-300 text-sm font-medium mb-1">Spend this month</p>
                <p className="text-3xl font-bold">₹20,700</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">14</p>
                <p className="text-gray-400 text-xs">Trips</p>
              </div>
            </div>
            
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.1)'}} contentStyle={{ backgroundColor: '#1C2B39', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} itemStyle={{ color: '#C4E538' }} />
                  <Bar dataKey="spend" fill="#C4E538" radius={[4, 4, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>W1</span><span>W4</span>
            </div>
          </div>
        </div>

        <div className="p-4 mt-2">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <ActionCard icon={<MapPin size={24} />} title="Saved Routes" subtitle="Addresses" onClick={() => pushView('business', 'saved_addresses')} />
            <ActionCard icon={<Calendar size={24} />} title="Recurring" subtitle="Schedules" onClick={() => pushView('business', 'recurring_pickups')} />
            <ActionCard icon={<FileSpreadsheet size={24} />} title="Invoices" subtitle="GST Export" onClick={() => pushView('business', 'gst_invoices')} />
            <ActionCard icon={<Users size={24} />} title="Team" subtitle="Accounts" onClick={() => pushView('business', 'team_accounts')} />
          </div>
        </div>
      </div>
    );
  }

  // Pass down state to subviews
  if (view === 'saved_addresses') return <SavedAddresses popView={popView} addresses={addresses} setAddresses={setAddresses} />;
  if (view === 'recurring_pickups') return <RecurringPickups popView={popView} pickups={pickups} setPickups={setPickups} addresses={addresses} />;
  if (view === 'gst_invoices') return <GstInvoices popView={popView} />;
  if (view === 'team_accounts') return <TeamAccounts popView={popView} team={team} setTeam={setTeam} />;

  return null;
}

function ActionCard({ icon, title, subtitle, onClick }) {
  return (
    <button onClick={onClick} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-3 active:scale-[0.97] transition-transform text-left">
      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-porter-dark">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 leading-tight">{title}</h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </button>
  );
}

// Sub-screens for Business Tab

function SavedAddresses({ popView, addresses, setAddresses }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newTag, setNewTag] = useState('Client Site');

  const handleAdd = () => {
    if (newLabel && newAddress) {
      setAddresses([...addresses, { id: Date.now(), label: newLabel, text: newAddress, tag: newTag }]);
      setShowAdd(false);
      setNewLabel('');
      setNewAddress('');
    }
  };

  return (
    <div className="min-h-full bg-porter-bg flex flex-col absolute inset-0 z-50 animate-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-4 pt-10 sticky top-0 border-b border-gray-100 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={popView} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ChevronLeft size={24} /></button>
          <h1 className="text-lg font-bold">Address Book</h1>
        </div>
        <button onClick={() => setShowAdd(true)} className="w-8 h-8 bg-porter-dark text-porter-primary rounded-full flex items-center justify-center shadow-md">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900">{addr.label}</h3>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wider">{addr.tag}</span>
              </div>
              <p className="text-sm text-gray-500">{addr.text}</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors" onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}><X size={16} /></button>
          </div>
        ))}
        {addresses.length === 0 && <p className="text-center text-gray-500 mt-10">No saved addresses yet.</p>}
      </div>

      {/* Add Bottom Sheet */}
      {showAdd && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50 animate-in fade-in duration-200" onClick={() => setShowAdd(false)}></div>
          <div className="bg-white rounded-t-3xl p-6 relative animate-in slide-in-from-bottom-full duration-300">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Label (e.g. Warehouse A)" value={newLabel} onChange={e => setNewLabel(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-porter-dark" />
              <textarea placeholder="Full Address" value={newAddress} onChange={e => setNewAddress(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-20 resize-none focus:outline-none focus:border-porter-dark" />
              <select value={newTag} onChange={e => setNewTag(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-porter-dark">
                <option>Warehouse</option>
                <option>Client Site</option>
                <option>Store</option>
              </select>
              <button onClick={handleAdd} className="w-full bg-porter-dark text-white font-bold py-3.5 rounded-xl">Save Address</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RecurringPickups({ popView, pickups, setPickups, addresses }) {
  const [showAdd, setShowAdd] = useState(false);
  const [from, setFrom] = useState(addresses[0]?.label || '');
  const [to, setTo] = useState(addresses[0]?.label || '');
  const [freq, setFreq] = useState('Daily');

  const handleAdd = () => {
    setPickups([...pickups, { id: Date.now(), from, to, freq, vehicle: 'Tata Ace', time: '10:00 AM', active: true }]);
    setShowAdd(false);
  };

  const toggleStatus = (id) => {
    setPickups(pickups.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="min-h-full bg-porter-bg flex flex-col absolute inset-0 z-50 animate-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-4 pt-10 sticky top-0 border-b border-gray-100 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={popView} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ChevronLeft size={24} /></button>
          <h1 className="text-lg font-bold">Recurring Schedules</h1>
        </div>
        <button onClick={() => setShowAdd(true)} className="text-porter-dark font-bold text-sm bg-porter-primary px-3 py-1.5 rounded-full shadow-sm">
          New
        </button>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {pickups.map(p => (
          <div key={p.id} className={cn("p-4 rounded-xl shadow-sm border transition-colors", p.active ? "bg-white border-gray-100" : "bg-gray-50 border-gray-200 opacity-70")}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Clock size={16} className={p.active ? "text-porter-dark" : "text-gray-400"} />
                <span className="font-bold text-gray-900">{p.freq} • {p.time}</span>
              </div>
              <button onClick={() => toggleStatus(p.id)} className={cn("text-xs font-bold px-2 py-1 rounded", p.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600")}>
                {p.active ? 'Active' : 'Paused'}
              </button>
            </div>
            
            <div className="relative pl-5 space-y-2 before:absolute before:left-[7px] before:top-1.5 before:bottom-1.5 before:w-[2px] before:bg-gray-200">
              <div className="relative text-sm text-gray-700">
                <div className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-gray-400 ring-2 ring-white" />
                {p.from}
              </div>
              <div className="relative text-sm font-semibold text-gray-900">
                <div className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-porter-dark ring-2 ring-white" />
                {p.to}
              </div>
            </div>
          </div>
        ))}
        {pickups.length === 0 && <p className="text-center text-gray-500 mt-10">No recurring pickups scheduled.</p>}
      </div>

      {showAdd && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50 animate-in fade-in duration-200" onClick={() => setShowAdd(false)}></div>
          <div className="bg-white rounded-t-3xl p-6 relative animate-in slide-in-from-bottom-full duration-300 max-h-[80%] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">New Recurring Schedule</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">From</label>
                <select value={from} onChange={e => setFrom(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-porter-dark">
                  {addresses.map(a => <option key={a.id} value={a.label}>{a.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">To</label>
                <select value={to} onChange={e => setTo(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-porter-dark">
                  {addresses.map(a => <option key={a.id} value={a.label}>{a.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Frequency</label>
                <div className="flex gap-2">
                  {['Daily', 'Weekly', 'Weekdays'].map(f => (
                    <button key={f} onClick={() => setFreq(f)} className={cn("px-4 py-2 rounded-lg text-sm font-semibold border", freq === f ? "bg-porter-dark text-white border-porter-dark" : "bg-white text-gray-600 border-gray-200")}>{f}</button>
                  ))}
                </div>
              </div>
              <button onClick={handleAdd} className="w-full bg-porter-dark text-white font-bold py-3.5 rounded-xl mt-4">Save Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GstInvoices({ popView }) {
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', date: 'Oct 12', amt: '₹1,200', selected: false },
    { id: 'INV-002', date: 'Oct 15', amt: '₹450', selected: false },
    { id: 'INV-003', date: 'Oct 18', amt: '₹2,100', selected: false },
  ]);
  const [exporting, setExporting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleSelect = (id) => {
    setInvoices(invoices.map(i => i.id === id ? { ...i, selected: !i.selected } : i));
  };
  
  const selectedCount = invoices.filter(i => i.selected).length;

  const handleExport = () => {
    if (selectedCount === 0) return;
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setShowToast(true);
      setInvoices(invoices.map(i => ({...i, selected: false})));
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-full bg-white flex flex-col absolute inset-0 z-50 animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 pt-10 sticky top-0 bg-white border-b border-gray-100 flex items-center gap-3 z-10">
        <button onClick={popView} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ChevronLeft size={24} /></button>
        <h1 className="text-lg font-bold">GST Invoices</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
              <th className="p-4 font-semibold w-10">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-porter-dark" onChange={e => setInvoices(invoices.map(i => ({...i, selected: e.target.checked})))} checked={invoices.length > 0 && selectedCount === invoices.length} />
              </th>
              <th className="p-4 font-semibold">Invoice No.</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer" onClick={() => toggleSelect(inv.id)}>
                <td className="p-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-porter-dark" checked={inv.selected} readOnly />
                </td>
                <td className="p-4 font-medium text-gray-900">{inv.id}</td>
                <td className="p-4 text-gray-500 text-sm">{inv.date}</td>
                <td className="p-4 text-right font-bold">{inv.amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 pb-8 sticky bottom-0">
        <button 
          onClick={handleExport}
          disabled={selectedCount === 0 || exporting}
          className="w-full bg-porter-dark text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
        >
          {exporting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Download size={20} />
              Export {selectedCount > 0 ? selectedCount : ''} GST Invoice(s)
            </>
          )}
        </button>
      </div>

      {showToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 fade-in duration-300 z-50 text-sm font-medium">
          <CheckCircle size={16} className="text-porter-primary" />
          Invoices exported successfully
        </div>
      )}
    </div>
  );
}

function TeamAccounts({ popView, team, setTeam }) {
  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Booker');

  const handleInvite = () => {
    if (email) {
      setTeam([...team, { id: Date.now(), email, role, status: 'Pending' }]);
      setShowInvite(false);
      setEmail('');
    }
  };

  return (
    <div className="min-h-full bg-porter-bg flex flex-col absolute inset-0 z-50 animate-in slide-in-from-right-4 duration-300">
      <div className="bg-white p-4 pt-10 sticky top-0 border-b border-gray-100 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={popView} className="p-2 -ml-2 rounded-full hover:bg-gray-100"><ChevronLeft size={24} /></button>
          <h1 className="text-lg font-bold">Team Accounts</h1>
        </div>
        <button onClick={() => setShowInvite(true)} className="w-8 h-8 bg-porter-dark text-porter-primary rounded-full flex items-center justify-center shadow-md">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {team.map(member => (
          <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase">
                {member.email[0]}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{member.email}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                    member.role === 'Admin' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                  )}>{member.role}</span>
                  {member.status === 'Pending' && <span className="text-[10px] font-bold text-orange-500">Pending Invite</span>}
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
          </div>
        ))}
      </div>

      {showInvite && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50 animate-in fade-in duration-200" onClick={() => setShowInvite(false)}></div>
          <div className="bg-white rounded-t-3xl p-6 relative animate-in slide-in-from-bottom-full duration-300">
            <h2 className="text-xl font-bold mb-4">Invite Teammate</h2>
            <div className="space-y-4">
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-porter-dark" />
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-porter-dark">
                <option value="Admin">Admin (Full Access)</option>
                <option value="Booker">Booker (Can book, cannot view spend)</option>
                <option value="Viewer">Viewer (Read-only)</option>
              </select>
              <button onClick={handleInvite} className="w-full bg-porter-dark text-white font-bold py-3.5 rounded-xl">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
