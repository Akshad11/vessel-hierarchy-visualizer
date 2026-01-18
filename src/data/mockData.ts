import type { TreeNodeData } from '../types';

// 1. SIMPLE: Lifeboat System
const simpleData: TreeNodeData = {
  id: 'root-simple',
  name: 'Lifeboat No. 1',
  type: 'system',
  children: [
    {
      id: 'sys-lb-type',
      name: 'Lifeboat Equipment',
      type: 'equipment_type',
      children: [
        {
          id: 'eq-lb-1',
          name: 'Propulsion Engine',
          type: 'equipment',
          children: [
            {
              id: 'assy-lb-1',
              name: 'Diesel Engine Unit',
              type: 'assembly',
              children: [
                { id: 'comp-lb-1', name: 'Starter Motor', type: 'component' },
                { id: 'comp-lb-2', name: 'Fuel Filter', type: 'component' }
              ]
            },
            {
              id: 'assy-lb-2',
              name: 'Propeller Shaft',
              type: 'assembly',
              children: [
                { id: 'comp-lb-3', name: '3-Blade Propeller', type: 'component' }
              ]
            }
          ]
        },
        {
          id: 'eq-lb-2',
          name: 'Safety Gear',
          type: 'equipment',
          children: [
            {
              id: 'assy-lb-3',
              name: 'Release Mechanism',
              type: 'assembly',
              children: [
                { id: 'comp-lb-4', name: 'Hydrostatic Release', type: 'component' },
                { id: 'comp-lb-5', name: 'Safety Pin', type: 'component' }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// 2. MODERATE: Auxiliary Generator
const moderateData: TreeNodeData = {
  id: 'root-mod',
  name: 'Auxiliary Generator System',
  type: 'system',
  children: [
    {
      id: 'type-gen-main',
      name: 'Power Generation',
      type: 'equipment_type',
      children: [
        {
          id: 'eq-gen-1',
          name: 'Diesel Generator Set 1',
          type: 'equipment',
          children: [
            {
              id: 'assy-gen-eng',
              name: 'Prime Mover (Engine)',
              type: 'assembly',
              children: [
                { id: 'comp-gen-1', name: 'Turbocharger', type: 'component' },
                { id: 'comp-gen-2', name: 'Intercooler', type: 'component' },
                { id: 'comp-gen-3', name: 'Governor', type: 'component' }
              ]
            },
            {
              id: 'assy-gen-alt',
              name: 'Alternator',
              type: 'assembly',
              children: [
                { id: 'comp-gen-4', name: 'AVR', type: 'component' },
                { id: 'comp-gen-5', name: 'Stator', type: 'component' },
                { id: 'comp-gen-6', name: 'Rotor', type: 'component' }
              ]
            }
          ]
        },
        {
          id: 'eq-gen-panel',
          name: 'Control Panel',
          type: 'equipment',
          children: [
            {
              id: 'assy-cp-1',
              name: 'Switchgear',
              type: 'assembly',
              children: [
                { id: 'comp-gen-7', name: 'Main Breaker', type: 'component' },
                { id: 'comp-gen-8', name: 'Bus Tie', type: 'component' }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// 3. COMPLEX: Standard Vessel (Original)
const complexData: TreeNodeData = {
  id: 'root',
  name: 'Vessel Fleet',
  type: 'system',
  children: [
    {
      id: 'eq-1',
      name: 'Propulsion Systems',
      type: 'equipment_type',
      children: [
        {
          id: 'me-1',
          name: 'Main Engine No. 1',
          type: 'equipment',
          children: [
            {
              id: 'assy-1',
              name: 'Cylinder Head Assembly',
              type: 'assembly',
              children: [
                { id: 'comp-1', name: 'Exhaust Valve', type: 'component' },
                { id: 'comp-2', name: 'Intake Valve', type: 'component' },
                { id: 'comp-3', name: 'Fuel Injector', type: 'component', isDraft: true },
                { id: 'comp-4', name: 'Rocker Arm', type: 'component' },
              ]
            },
            {
              id: 'assy-2',
              name: 'Turbocharger System',
              type: 'assembly',
              children: [
                { id: 'comp-5', name: 'Turbine Wheel', type: 'component' },
                { id: 'comp-6', name: 'Compressor Wheel', type: 'component' },
                { id: 'comp-7', name: 'Bearing Housing', type: 'component' },
              ]
            },
            {
              id: 'assy-3',
              name: 'Fuel Supply Unit',
              type: 'assembly',
              children: [
                { id: 'comp-8', name: 'High Pressure Pump', type: 'component' },
                { id: 'comp-9', name: 'Flow Meter', type: 'component' },
              ]
            }
          ]
        },
        {
          id: 'me-2',
          name: 'Main Engine No. 2',
          type: 'equipment',
          isDraft: true,
          children: [
            {
              id: 'assy-4',
              name: 'Cylinder Block',
              type: 'assembly',
              children: [
                { id: 'comp-10', name: 'Cylinder Liner', type: 'component' },
                { id: 'comp-11', name: 'Piston Ring Set', type: 'component' },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eq-2',
      name: 'Electrical Power',
      type: 'equipment_type',
      children: [
        {
          id: 'gen-1',
          name: 'Diesel Generator 1',
          type: 'equipment',
          children: [
            {
              id: 'assy-5',
              name: 'Alternator',
              type: 'assembly',
              children: [
                { id: 'comp-12', name: 'Stator Winding', type: 'component' },
                { id: 'comp-13', name: 'Rotor Assembly', type: 'component' },
                { id: 'comp-14', name: 'AVR Unit', type: 'component' },
              ]
            },
            {
              id: 'assy-6',
              name: 'Cooling System',
              type: 'assembly',
              children: [
                { id: 'comp-15', name: 'Radiator Fan', type: 'component' },
                { id: 'comp-16', name: 'Water Pump', type: 'component' },
              ]
            }
          ]
        },
        {
          id: 'swbd-1',
          name: 'Main Switchboard',
          type: 'equipment',
          children: [
            {
              id: 'assy-7',
              name: 'Breaker Panel A',
              type: 'assembly',
              children: [
                { id: 'comp-17', name: 'ACB 440V', type: 'component' },
                { id: 'comp-18', name: 'Busbar Link', type: 'component' },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eq-3',
      name: 'Cargo Handling',
      type: 'equipment_type',
      children: [
        {
          id: 'crane-1',
          name: 'Deck Crane Starboard',
          type: 'equipment',
          children: [
            {
              id: 'assy-8',
              name: 'Hoisting Winch',
              type: 'assembly',
              children: [
                { id: 'comp-19', name: 'Hydraulic Motor', type: 'component' },
                { id: 'comp-20', name: 'Brake Band', type: 'component' },
                { id: 'comp-21', name: 'Steel Wire Rope', type: 'component' },
              ]
            },
            {
              id: 'assy-9',
              name: 'Slewing Gear',
              type: 'assembly',
              children: [
                { id: 'comp-22', name: 'Pinion Gear', type: 'component' },
                { id: 'comp-23', name: 'Slewing Bearing', type: 'component' },
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eq-4',
      name: 'Navigation & Comm',
      type: 'equipment_type',
      children: [
        {
          id: 'nav-1',
          name: 'X-Band Radar',
          type: 'equipment',
          children: [
            {
              id: 'assy-10',
              name: 'Antenna Unit',
              type: 'assembly',
              children: [
                { id: 'comp-24', name: 'Magnetron', type: 'component' },
                { id: 'comp-25', name: 'Drive Motor', type: 'component' },
              ]
            }
          ]
        }
      ]
    }
  ]
};

// 4. VERY COMPLEX: Drilling Rig Package
const veryComplexData: TreeNodeData = {
  id: 'root-drill',
  name: 'Offshore Drilling Package',
  type: 'system',
  children: [
    {
      id: 'type-drill-main',
      name: 'Drilling Machinery',
      type: 'equipment_type',
      children: [
        {
          id: 'eq-drill-1',
          name: 'Top Drive System',
          type: 'equipment',
          children: [
            {
              id: 'assy-dr-1',
              name: 'Main Motor Module',
              type: 'assembly',
              children: [
                { id: 'comp-dr-1', name: 'AC Motor A', type: 'component' },
                { id: 'comp-dr-2', name: 'AC Motor B', type: 'component' },
                { id: 'comp-dr-3', name: 'Cooling Blower', type: 'component' }
              ]
            },
            {
              id: 'assy-dr-2',
              name: 'Pipe Handler',
              type: 'assembly',
              children: [
                { id: 'comp-dr-4', name: 'Torque Wrench', type: 'component' },
                { id: 'comp-dr-5', name: 'Link Tilt', type: 'component' },
                { id: 'comp-dr-6', name: 'IBOP Valve', type: 'component' }
              ]
            }
          ]
        },
        {
          id: 'eq-drill-2',
          name: 'Drawworks',
          type: 'equipment',
          children: [
            {
              id: 'assy-dr-3',
              name: 'Drum Assembly',
              type: 'assembly',
              children: [
                { id: 'comp-dr-7', name: 'Grooved Drum', type: 'component' },
                { id: 'comp-dr-8', name: 'Lebus Grooving', type: 'component' }
              ]
            },
            {
              id: 'assy-dr-4',
              name: 'Braking System',
              type: 'assembly',
              children: [
                {
                  id: 'comp-sub-1',
                  name: 'Disc Brake A',
                  type: 'component'
                },
                {
                  id: 'comp-sub-2',
                  name: 'Disc Brake B',
                  type: 'component'
                },
                {
                  id: 'comp-sub-3',
                  name: 'Emergency Band Brake',
                  type: 'component'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eq-drill-3',
      name: 'Mud Pumps',
      type: 'equipment_type',
      children: [
        {
          id: 'eq-mp-1',
          name: 'Mud Pump No. 1',
          type: 'equipment',
          children: [
            {
              id: 'assy-mp-1',
              name: 'Fluid End',
              type: 'assembly',
              children: [
                { id: 'comp-mp-1', name: 'Piston', type: 'component' },
                { id: 'comp-mp-2', name: 'Liner', type: 'component' },
                { id: 'comp-mp-3', name: 'Valve', type: 'component' }
              ]
            }
          ]
        },
        {
          id: 'eq-mp-2',
          name: 'Mud Pump No. 2',
          type: 'equipment',
          children: [
            {
              id: 'assy-mp-2',
              name: 'Power End',
              type: 'assembly',
              children: [
                { id: 'comp-mp-4', name: 'Crankshaft', type: 'component' },
                { id: 'comp-mp-5', name: 'Bull Gear', type: 'component' }
              ]
            }
          ]
        }
      ]
    }
  ]
};

// 5. ULTRA COMPLEX: LNG Carrier Containment
const ultraComplexData: TreeNodeData = {
  id: 'root-lng',
  name: 'LNG Carrier Containment',
  type: 'system',
  children: [
    {
      id: 'eq-tank-1',
      name: 'Cargo Tank 1',
      type: 'equipment_type',
      children: [
        {
          id: 'eq-sub-1',
          name: 'Primary Barrier System',
          type: 'equipment',
          children: [
            {
              id: 'assy-lng-1',
              name: 'Invar Membrane',
              type: 'assembly',
              children: [
                { id: 'comp-lng-1', name: 'Strake A', type: 'component' },
                { id: 'comp-lng-2', name: 'Strake B', type: 'component' }
              ]
            },
            {
              id: 'assy-lng-2',
              name: 'Insulation Box',
              type: 'assembly',
              children: [
                { id: 'comp-lng-3', name: 'Plywood Box', type: 'component' },
                { id: 'comp-lng-4', name: 'Perlite Fill', type: 'component' }
              ]
            }
          ]
        },
        {
          id: 'eq-sub-2',
          name: 'Cargo Pumps',
          type: 'equipment',
          children: [
            {
              id: 'assy-lng-3',
              name: 'Submerged Pump 1',
              type: 'assembly',
              children: [
                { id: 'comp-lng-5', name: 'Inducer', type: 'component' },
                { id: 'comp-lng-6', name: 'Impeller', type: 'component' },
                { id: 'comp-lng-7', name: 'Motor Stator', type: 'component' },
                { id: 'comp-lng-8', name: 'Upper Bearing', type: 'component' },
                { id: 'comp-lng-9', name: 'Lower Bearing', type: 'component' }
              ]
            },
            {
              id: 'assy-lng-4',
              name: 'Spray Pump',
              type: 'assembly',
              children: [
                { id: 'comp-lng-10', name: 'Impeller', type: 'component' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'eq-reliq',
      name: 'Reliquefaction Plant',
      type: 'equipment_type',
      children: [
        {
          id: 'eq-comp-a',
          name: 'BOG Compressor A',
          type: 'equipment',
          children: [
            {
              id: 'assy-re-1',
              name: 'Stage 1',
              type: 'assembly',
              children: [{ id: 'c-1', name: 'Vane', type: 'component' }]
            },
            {
              id: 'assy-re-2',
              name: 'Stage 2',
              type: 'assembly',
              children: [{ id: 'c-2', name: 'Vane', type: 'component' }]
            },
            {
              id: 'assy-re-3',
              name: 'Stage 3',
              type: 'assembly',
              children: [{ id: 'c-3', name: 'Vane', type: 'component' }]
            }
          ]
        },
        {
          id: 'eq-comp-b',
          name: 'BOG Compressor B',
          type: 'equipment',
          children: [
            {
              id: 'assy-re-4',
              name: 'Electric Motor',
              type: 'assembly',
              children: [
                { id: 'c-4', name: 'Winding', type: 'component' },
                { id: 'c-5', name: 'Bearing', type: 'component' }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const datasets: Record<string, TreeNodeData> = {
  'simple': simpleData,
  'moderate': moderateData,
  'complex': complexData,
  'very_complex': veryComplexData,
  'ultra_complex': ultraComplexData
};

export const datasetOptions = [
  { label: 'Simple (Lifeboat)', value: 'simple' },
  { label: 'Moderate (Generator)', value: 'moderate' },
  { label: 'Complex (Vessel Fleet)', value: 'complex' },
  { label: 'Very Complex (Drilling)', value: 'very_complex' },
  { label: 'Ultra Complex (LNG)', value: 'ultra_complex' },
];

// Default export for backward compatibility if needed, though we primarily use the map now
export const vesselData = complexData;
