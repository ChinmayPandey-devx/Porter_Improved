// ==========================================
// MODULE 2: PORTER FOR BUSINESS LITE TIER
// ==========================================

function SubNavButton({ active, onClick, label }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors",
        active ? "bg-porter-dark text-porter-primary" : "text-gray-500 hover:bg-gray-100"
      )}
    >
      {label}
    </button>
  );
}

function BusinessTab() {
  const [unlocked, setUnlocked] = useState(false);
  const [subView, setSubView] = useState('dashboard');

  // MOCK STATE FOR DEMO
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Main Warehouse', tag: 'Warehouse', text: 'Peenya Industrial Area, Phase 2' },
    { id: 2, label: 'City Hub', tag: 'Hub', text: 'Indiranagar 100ft Road' },
    { id: 3, label: 'Supplier Alpha', tag: 'Client Site', text: 'Whitefield Main Road' }
  ]);
  const [pickups, setPickups] = useState([
    { id: 1, from: 'Main Warehouse', to: 'City Hub', freq: 'Daily', vehicle: 'Tata Ace', time: '10:00 AM', active: true }
  ]);
  const [team, setTeam] = useState([
    { id: 1, email: 'rohan@mycompany.com', role: 'Admin', status: 'Active' },
    { id: 2, email: 'warehouse@mycompany.com', role: 'Booker', status: 'Active' },
    { id: 3, email: 'finance@mycompany.com', role: 'Viewer', status: 'Pending' }
  ]);
  const [invoices, setInvoices] = useState([
    { id: 'INV-001', date: 'Oct 12', amt: '₹1,200', selected: false, status: 'Paid', gst: '29ABCDE1234F1Z5' },
    { id: 'INV-002', date: 'Oct 15', amt: '₹450', selected: false, status: 'Paid', gst: '29ABCDE1234F1Z5' },
    { id: 'INV-003', date: 'Oct 18', amt: '₹2,100', selected: false, status: 'Paid', gst: '29ABCDE1234F1Z5' },
    { id: 'INV-004', date: 'Oct 22', amt: '₹890', selected: false, status: 'Unpaid', gst: '29ABCDE1234F1Z5' }
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
  return (
    <div className="min-h-full bg-porter-bg flex flex-col relative pb-6">
      <div className="bg-white border-b border-gray-100 pt-4 pb-2 px-2 sticky top-0 z-20 shadow-sm flex items-center gap-1 overflow-x-auto no-scrollbar rounded-t-3xl">
        <SubNavButton active={subView === 'dashboard'} onClick={() => setSubView('dashboard')} label="Dashboard" />
        <SubNavButton active={subView === 'addresses'} onClick={() => setSubView('addresses')} label="Addresses" />
        <SubNavButton active={subView === 'recurring'} onClick={() => setSubView('recurring')} label="Recurring" />
        <SubNavButton active={subView === 'invoices'} onClick={() => setSubView('invoices')} label="Invoices" />
        <SubNavButton active={subView === 'team'} onClick={() => setSubView('team')} label="Team" />
      </div>

      <div className="flex-1">
         {subView === 'dashboard' && <BusinessDashboard setSubView={setSubView} />}
         {subView === 'addresses' && <SavedAddresses addresses={addresses} setAddresses={setAddresses} />}
         {subView === 'recurring' && <RecurringPickups pickups={pickups} setPickups={setPickups} addresses={addresses} />}
         {subView === 'invoices' && <GstInvoices invoices={invoices} setInvoices={setInvoices} />}
         {subView === 'team' && <TeamAccounts team={team} setTeam={setTeam} />}
      </div>
    </div>
  );
}

function BusinessDashboard({ setSubView }) {
  const sparklineData = [
    { name: 'W1', spend: 4000 },
    { name: 'W2', spend: 3000 },
    { name: 'W3', spend: 5500 },
    { name: 'W4', spend: 8200 },
  ];

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="bg-porter-dark text-white p-6 relative overflow-hidden shadow-sm">
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
              <p className="text-gray-400 text-xs">Trips • ₹1,478 avg</p>
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
            <span>Last 4 Weeks</span>
          </div>
        </div>
      </div>

      <div className="p-4 mt-2">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <ActionCard icon={<Calendar size={24} />} title="New Booking" subtitle="Schedule Pickup" onClick={() => setSubView('recurring')} />
          <ActionCard icon={<MapPin size={24} />} title="Saved Routes" subtitle="Addresses" onClick={() => setSubView('addresses')} />
          <ActionCard icon={<Users size={24} />} title="Team" subtitle="Accounts" onClick={() => setSubView('team')} />
          <ActionCard icon={<FileSpreadsheet size={24} />} title="Invoices" subtitle="GST Export" onClick={() => setSubView('invoices')} />
        </div>
      </div>
    </div>
  );
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

function SavedAddresses({ addresses, setAddresses }) {
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
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Address Book</h1>
        <button onClick={() => setShowAdd(true)} className="w-8 h-8 bg-porter-dark text-porter-primary rounded-full flex items-center justify-center shadow-md">
          <Plus size={20} />
        </button>
      </div>

      <div className="px-4 space-y-3 pb-8">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900">{addr.label}</h3>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full uppercase tracking-wider">{addr.tag}</span>
              </div>
              <p className="text-sm text-gray-500">{addr.text}</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 transition-colors p-1" onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}><X size={16} /></button>
          </div>
        ))}
        {addresses.length === 0 && <p className="text-center text-gray-500 mt-10">No saved addresses yet.</p>}
      </div>

      {showAdd && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50 animate-in fade-in duration-200" onClick={() => setShowAdd(false)}></div>
          <div className="bg-white rounded-t-3xl p-6 relative animate-in slide-in-from-bottom-full duration-300 z-10">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Add New Address</h2>
               <button onClick={() => setShowAdd(false)} className="p-1"><X size={20} /></button>
            </div>
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

function RecurringPickups({ pickups, setPickups, addresses }) {
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
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Recurring Schedules</h1>
        <button onClick={() => setShowAdd(true)} className="text-porter-dark font-bold text-sm bg-porter-primary px-3 py-1.5 rounded-full shadow-sm">
          New
        </button>
      </div>

      <div className="px-4 space-y-3 pb-8">
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
          <div className="bg-white rounded-t-3xl p-6 relative animate-in slide-in-from-bottom-full duration-300 max-h-[80%] overflow-y-auto z-10">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">New Schedule</h2>
               <button onClick={() => setShowAdd(false)} className="p-1"><X size={20} /></button>
            </div>
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

function GstInvoices({ invoices, setInvoices }) {
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
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="p-4">
        <h1 className="text-lg font-bold mb-3">GST Invoices</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
                <th className="p-3 font-semibold w-10">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-porter-dark" onChange={e => setInvoices(invoices.map(i => ({...i, selected: e.target.checked})))} checked={invoices.length > 0 && selectedCount === invoices.length} />
                </th>
                <th className="p-3 font-semibold">Invoice No.</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer" onClick={() => toggleSelect(inv.id)}>
                  <td className="p-3">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-porter-dark" checked={inv.selected} readOnly />
                  </td>
                  <td className="p-3 font-medium text-gray-900 text-sm">
                    {inv.id}
                    <div className="text-[10px] font-normal text-gray-400">{inv.gst}</div>
                  </td>
                  <td className="p-3 text-gray-500 text-xs">
                    {inv.date}
                    <div className={cn("text-[10px] font-bold mt-0.5", inv.status === 'Paid' ? "text-green-600" : "text-orange-500")}>{inv.status}</div>
                  </td>
                  <td className="p-3 text-right font-bold text-sm">{inv.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 pt-0">
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
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 fade-in duration-300 z-50 text-sm font-medium whitespace-nowrap">
          <CheckCircle size={16} className="text-porter-primary" />
          Invoices exported successfully
        </div>
      )}
    </div>
  );
}

function TeamAccounts({ team, setTeam }) {
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
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-lg font-bold">Team Accounts</h1>
        <button onClick={() => setShowInvite(true)} className="w-8 h-8 bg-porter-dark text-porter-primary rounded-full flex items-center justify-center shadow-md">
          <Plus size={20} />
        </button>
      </div>

      <div className="px-4 space-y-3 pb-8">
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
                    member.role === 'Admin' ? "bg-purple-100 text-purple-700" : member.role === 'Viewer' ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"
                  )}>{member.role}</span>
                  {member.status === 'Pending' && <span className="text-[10px] font-bold text-orange-500">Pending</span>}
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
          <div className="bg-white rounded-t-3xl p-6 relative animate-in slide-in-from-bottom-full duration-300 z-10">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-bold">Invite Teammate</h2>
               <button onClick={() => setShowInvite(false)} className="p-1"><X size={20} /></button>
            </div>
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
