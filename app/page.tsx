"use client";

import { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Minus, GripVertical } from 'lucide-react';

type Day = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi';

interface TimeSlot {
  id: string;
  label: string;
  timeBlock: 'Matin' | 'Récréation' | 'Après-midi';
  visible: boolean;
  timeRange?: string;
}

const EmploiDuTempsRevolutionnaire = () => {
  const days: Day[] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: '1', label: 'Créneau 1', timeBlock: 'Matin', visible: true, timeRange: '8h00 - 8h45' },
    { id: '2', label: 'Créneau 2', timeBlock: 'Matin', visible: true, timeRange: '8h45 - 9h30' },
    { id: '3', label: 'Créneau 3', timeBlock: 'Matin', visible: true, timeRange: '9h30 - 10h15' },
    { id: '4', label: 'Pause', timeBlock: 'Récréation', visible: true, timeRange: '10h15 - 10h30' },
    { id: '5', label: 'Créneau 4', timeBlock: 'Récréation', visible: true, timeRange: '10h30 - 11h15' },
    { id: '6', label: 'Créneau 5', timeBlock: 'Récréation', visible: true, timeRange: '11h15 - 12h00' },
    { id: '7', label: 'Créneau 6', timeBlock: 'Après-midi', visible: true, timeRange: '13h30 - 14h15' },
    { id: '8', label: 'Créneau 7', timeBlock: 'Après-midi', visible: true, timeRange: '14h15 - 15h00' },
    { id: '9', label: 'Créneau 8', timeBlock: 'Après-midi', visible: true, timeRange: '15h00 - 15h45' },
    { id: '10', label: 'Créneau 9', timeBlock: 'Après-midi', visible: true, timeRange: '15h45 - 16h30' },
  ]);

  const toggleSlotVisibility = (id: string) => {
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.id === id ? { ...slot, visible: !slot.visible } : slot
      )
    );
  };

  const addNewSlot = (timeBlock: 'Matin' | 'Récréation' | 'Après-midi') => {
    const newId = `${timeSlots.length + 1}`;
    setTimeSlots(prev => [
      ...prev,
      { 
        id: newId, 
        label: `Nouveau Créneau`, 
        timeBlock, 
        visible: true,
        timeRange: '--:-- - --:--'
      }
    ]);
  };

  return (
    <div className="max-w-[1800px] mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* En-tête moderne avec jours */}
        <div className="grid grid-cols-7 gap-0.5 bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <div className="col-span-1"></div>
          {days.map(day => (
            <div key={day} className="text-center text-white font-bold">
              <div className="text-lg">{day === 'Mercredi' ? 'Mercre.' : day}</div>
              <div className="text-sm opacity-80">12/06</div>
            </div>
          ))}
        </div>

        {/* Corps de l'emploi du temps */}
        <div className="divide-y divide-gray-200">
          {(['Matin', 'Récréation', 'Après-midi'] as const).map(block => {
            const blockSlots = timeSlots.filter(slot => slot.timeBlock === block);
            const visibleSlots = blockSlots.filter(slot => slot.visible);
            
            return (
              <div key={block} className="group">
                {/* En-tête de bloc interactif */}
                <div className={`flex items-center justify-between px-6 py-3 ${block === 'Matin' ? 'bg-blue-50' : block === 'Récréation' ? 'bg-amber-50' : 'bg-indigo-50'}`}>
                  <h3 className="text-lg font-semibold text-gray-800">{block}</h3>
                  <button 
                    onClick={() => addNewSlot(block)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-white"
                  >
                    <Plus size={18} className="text-gray-500" />
                  </button>
                </div>

                {/* Créneaux */}
                {blockSlots.length > 0 && (
                  <div className="grid grid-cols-7 gap-0.5">
                    {/* Colonne des créneaux */}
                    <div className="col-span-1 bg-gray-50">
                      {blockSlots.map(slot => (
                        <div 
                          key={`label-${slot.id}`} 
                          className={`flex items-center justify-between p-3 h-[72px] border-b ${!slot.visible && 'opacity-50'}`}
                        >
                          <div>
                            <div className="font-medium">{slot.label}</div>
                            <div className="text-xs text-gray-500">{slot.timeRange}</div>
                          </div>
                          <button 
                            onClick={() => toggleSlotVisibility(slot.id)}
                            className="p-1 rounded-full hover:bg-gray-200"
                          >
                            {slot.visible ? <Minus size={16} /> : <Plus size={16} />}
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Colonnes des jours */}
                    {days.map(day => (
                      <div key={day} className="col-span-1 bg-white">
                        {blockSlots.map(slot => (
                          <div 
                            key={`${day}-${slot.id}`} 
                            className={`p-3 h-[72px] border-b flex items-center justify-center ${!slot.visible && 'hidden'}`}
                          >
                            <div className="w-full h-full rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center relative">
                              <GripVertical className="absolute left-1 text-gray-400" size={14} />
                              <span className="text-xs text-gray-500">Ajouter</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Légende et actions */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span className="inline-flex items-center mr-4">
            <span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-500 mr-1"></span>
            Cours programmé
          </span>
          <span className="inline-flex items-center">
            <span className="w-3 h-3 rounded-full bg-gray-100 border border-gray-400 mr-1"></span>
            Créneau disponible
          </span>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all">
          Générer l'emploi du temps
        </button>
      </div>
    </div>
  );
};

export default EmploiDuTempsRevolutionnaire;