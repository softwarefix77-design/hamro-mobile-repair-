import React, { useState } from 'react';
import { useRepair } from '../context/RepairContext';
import { RepairStatus, RepairTicket } from '../types/repair';
import { 
  X, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Filter, 
  Eye, 
  Plus, 
  AlertTriangle 
} from 'lucide-react';

export const TechnicianAdminDrawer: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    tickets, 
    advanceTicketStatus, 
    updateTicket, 
    setActiveTrackId,
    resetToDefaultData,
    addBooking,
    lang
  } = useRepair();

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [techNoteInput, setTechNoteInput] = useState('');
  const [costInput, setCostInput] = useState<number>(0);
  const [showNewWalkin, setShowNewWalkin] = useState(false);

  // New walk-in states
  const [walkinName, setWalkinName] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('');
  const [walkinModel, setWalkinModel] = useState('');
  const [walkinIssue, setWalkinIssue] = useState('Screen Cracked');

  if (!isAdminOpen) return null;

  const filteredTickets = tickets.filter((t) => {
    if (selectedFilter === 'all') return true;
    return t.status === selectedFilter;
  });

  const handleOpenEdit = (t: RepairTicket) => {
    setEditingTicketId(t.id);
    setTechNoteInput(t.technicianNotes);
    setCostInput(t.estimatedCost);
  };

  const handleSaveNotes = (id: string) => {
    updateTicket(id, {
      technicianNotes: techNoteInput,
      estimatedCost: Number(costInput) || 1000,
    });
    setEditingTicketId(null);
  };

  const handleCreateWalkin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName.trim() || !walkinPhone.trim()) return;

    addBooking({
      customerName: walkinName.trim(),
      phone: walkinPhone.trim(),
      deviceBrand: 'Smartphone',
      deviceModel: walkinModel.trim() || 'General Model',
      issueCategory: walkinIssue,
      issueDescription: 'Walk-in customer at Shani Mandir Road counter.',
      urgent: false,
      serviceType: 'walk-in',
    });

    setWalkinName('');
    setWalkinPhone('');
    setWalkinModel('');
    setShowNewWalkin(false);
  };

  const statusOptions: { key: RepairStatus; label: string; color: string }[] = [
    { key: 'received', label: 'Received', color: 'bg-slate-200 text-slate-800' },
    { key: 'diagnosing', label: 'Diagnosing', color: 'bg-amber-100 text-amber-800' },
    { key: 'repairing', label: 'Repairing', color: 'bg-blue-100 text-blue-800' },
    { key: 'testing', label: 'Bench Testing', color: 'bg-purple-100 text-purple-800' },
    { key: 'ready', label: 'Ready for Pickup', color: 'bg-emerald-100 text-emerald-800' },
    { key: 'delivered', label: 'Delivered', color: 'bg-gray-100 text-gray-800' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-base font-bold">Technician Service Desk</h3>
              <p className="text-xs text-slate-400">Shani Mandir Road Bench Management</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Status filters */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              All ({tickets.length})
            </button>
            {statusOptions.map((st) => (
              <button
                key={st.key}
                onClick={() => setSelectedFilter(st.key)}
                className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === st.key ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowNewWalkin(!showNewWalkin)}
              className="px-2.5 py-1 bg-blue-600 text-white rounded font-medium flex items-center gap-1 hover:bg-blue-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Walk-in</span>
            </button>
            <button
              onClick={resetToDefaultData}
              className="p-1 text-slate-500 hover:text-slate-800"
              title="Reset demo data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Optional: Add Walk-in form */}
        {showNewWalkin && (
          <form onSubmit={handleCreateWalkin} className="p-4 bg-blue-50/70 border-b border-blue-200 space-y-3 text-xs">
            <p className="font-bold text-blue-900">Add Walk-in Device at Counter</p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={walkinName}
                onChange={(e) => setWalkinName(e.target.value)}
                placeholder="Customer Name"
                className="p-2 bg-white border border-slate-300 rounded"
              />
              <input
                type="tel"
                required
                value={walkinPhone}
                onChange={(e) => setWalkinPhone(e.target.value)}
                placeholder="Phone (e.g. 9842000000)"
                className="p-2 bg-white border border-slate-300 rounded font-mono"
              />
              <input
                type="text"
                required
                value={walkinModel}
                onChange={(e) => setWalkinModel(e.target.value)}
                placeholder="Model (e.g. Galaxy A54)"
                className="p-2 bg-white border border-slate-300 rounded"
              />
              <input
                type="text"
                value={walkinIssue}
                onChange={(e) => setWalkinIssue(e.target.value)}
                placeholder="Reported Problem"
                className="p-2 bg-white border border-slate-300 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewWalkin(false)}
                className="px-3 py-1 text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
              >
                Log Ticket
              </button>
            </div>
          </form>
        )}

        {/* Tickets List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredTickets.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No tickets found in this category.
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-blue-600 font-mono text-sm">{ticket.id}</span>
                    <span className="font-bold text-slate-900">{ticket.deviceModel}</span>
                    {ticket.urgent && (
                      <span className="px-1.5 py-0.5 text-[10px] bg-amber-500 text-slate-950 font-bold rounded">
                        URGENT
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setActiveTrackId(ticket.id);
                      setIsAdminOpen(false);
                      const el = document.getElementById('track');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View in Tracker</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px]">
                  <div>Customer: <strong className="text-slate-800">{ticket.customerName}</strong> ({ticket.phone})</div>
                  <div>Estimated Cost: <strong className="text-slate-800 font-mono">रू {ticket.estimatedCost.toLocaleString()}</strong></div>
                  <div className="col-span-2 text-slate-500">Issue: {ticket.issueCategory} · {ticket.issueDescription}</div>
                </div>

                {/* Change Status Fast Buttons */}
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">
                    Current Status: <span className="text-blue-600 font-bold uppercase">{ticket.status}</span> (Advance below)
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {statusOptions.map((st) => (
                      <button
                        key={st.key}
                        onClick={() => advanceTicketStatus(ticket.id, st.key)}
                        disabled={ticket.status === st.key}
                        className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                          ticket.status === st.key
                            ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-300'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        ➔ {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Edit notes toggle */}
                {editingTicketId === ticket.id ? (
                  <div className="pt-2 border-t border-slate-200 space-y-2">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Update Technician Bench Notes:
                    </label>
                    <textarea
                      rows={2}
                      value={techNoteInput}
                      onChange={(e) => setTechNoteInput(e.target.value)}
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                    />
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-slate-600">Updated Cost (NPR):</label>
                      <input
                        type="number"
                        value={costInput}
                        onChange={(e) => setCostInput(Number(e.target.value))}
                        className="w-28 p-1.5 bg-white border border-slate-300 rounded text-xs font-mono"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingTicketId(null)}
                        className="px-2.5 py-1 text-slate-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNotes(ticket.id)}
                        className="px-3 py-1 bg-emerald-600 text-white font-medium rounded hover:bg-emerald-700"
                      >
                        Save Notes & Cost
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <span className="truncate max-w-xs italic">Bench note: {ticket.technicianNotes}</span>
                    <button
                      onClick={() => handleOpenEdit(ticket)}
                      className="text-blue-600 hover:underline shrink-0 ml-2"
                    >
                      Edit note/cost
                    </button>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Hamro Mobile Repair Internal Bench Panel · Shani Mandir Road, Biratnagar
        </div>

      </div>
    </div>
  );
};
