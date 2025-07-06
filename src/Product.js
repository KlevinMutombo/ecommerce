// src/pages/ProductsList.js
import React, { useState, useEffect } from 'react';
import './Product.css';

const catalog = [
  { id: 1, name: 'Air Max 270',         price: 150, image: '/airmax270.png',         availableSizes: ['US 7','US 8','US 9','US 10'], availableColors: ['Black','White'] },
  { id: 2, name: 'Air Max 90',          price: 140, image: '/airmax90.png',          availableSizes: ['US 6','US 7','US 8'],          availableColors: ['Red','Blue'] },
  { id: 3, name: 'Air Max Coral',       price: 155, image: '/airmaxcoral.png',       availableSizes: ['US 8','US 9','US 11'],        availableColors: ['Coral','White'] },
  { id: 4, name: 'Air Force 1',         price: 120, image: '/airforce1.png',         availableSizes: ['US 6','US 9','US 10'],       availableColors: ['White','Black'] },
  { id: 5, name: 'VaporMax 2021',       price: 180, image: '/vapormax2021.png',       availableSizes: ['US 7','US 8','US 9'],        availableColors: ['Black','Red'] },
  { id: 6, name: 'React Infinity Run',  price: 160, image: '/reactinfinity.png',      availableSizes: ['US 8','US 9','US 10'],       availableColors: ['Blue','Green'] },
  { id: 7, name: 'Pegasus Trail 2',     price: 135, image: '/pegasustrail2.png',    availableSizes: ['US 7','US 8','US 10'],       availableColors: ['Black','White'] },
  { id: 8, name: 'ZoomX Vaporfly',      price: 200, image: '/zoomxvaporfly.png',     availableSizes: ['US 6','US 9','US 11'],       availableColors: ['Blue','Red'] },
  { id: 9, name: 'Blazer Mid \'77',     price: 110, image: '/blazermid77.png',       availableSizes: ['US 7','US 8','US 9'],        availableColors: ['White','Green'] },
  { id:10, name: 'Court Vision Low',     price: 95,  image: '/courtvisionlow.png',    availableSizes: ['US 6','US 9','US 10'],       availableColors: ['White','Black'] },
  { id:11, name: 'Air Zoom Pegasus 38', price: 130, image: '/pegasus38.png',          availableSizes: ['US 7','US 8','US 11'],       availableColors: ['Black','White'] },
  { id:12, name: 'Jordan 1 Retro',       price: 170, image: '/jordan1retro.png',      availableSizes: ['US 8','US 9','US 10'],       availableColors: ['Red','White'] },
];

const allSizes = ['US 6','US 7','US 8','US 9','US 10','US 11'];
const allColors = ['Black','White','Red','Blue','Green','Coral'];

export default function ProductsList() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);

  const [filters, setFilters] = useState({ sizes: [], colors: [] });
  const [filteredCatalog, setFilteredCatalog] = useState(catalog);
  const [openConfiguratorId, setOpenConfiguratorId] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

   useEffect(() => {
     if (
       openConfiguratorId !== null &&
       selectedSize !== '' &&
       selectedColor !== ''
     ) {
       setCurrentStep(3);
     }
   }, [openConfiguratorId, selectedSize, selectedColor]);

  // Faceted filtering
  useEffect(() => {
    const result = catalog.filter(item => {
      const sizeMatch = filters.sizes.length === 0 || filters.sizes.some(sz => item.availableSizes.includes(sz));
      const colorMatch = filters.colors.length === 0 || filters.colors.some(cl => item.availableColors.includes(cl));
      return sizeMatch && colorMatch;
    });
    setFilteredCatalog(result);
  }, [filters]);

  const toggleFacet = (type, value) => {
    setFilters(prev => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value) ? list.filter(x => x !== value) : [...list, value]
      };
    });
  };

  const toggleConfigurator = id => {
    if (openConfiguratorId === id) {
      setOpenConfiguratorId(null);
      setCurrentStep(1);
    } else {
      setOpenConfiguratorId(id);
       setSelectedSize('');    
       setSelectedColor('');
      setCurrentStep(2);
    }
  };

  const confirmAdd = item => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const found = cart.find(c => c.id === item.id && c.size === selectedSize && c.color === selectedColor);
    if (found) found.quantity++;
    else cart.push({ ...item, size: selectedSize, color: selectedColor, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${item.name} (${selectedSize}, ${selectedColor})`);
    setOpenConfiguratorId(null);
    setCurrentStep(3);
    setCurrentStep(4);

  };

    const instructionText = () => {
    switch (currentStep) {
      case 1: return `Step 1 of ${totalSteps}: Select your sneaker`;
      case 2: return `Step 2 of ${totalSteps}: Choose size & color`;
      case 3: return `Step 3 of ${totalSteps}: Add to cart`;
      case 4: return `Step 4 of ${totalSteps}: Go to cart`;
      default: return '';
    }
  };

   return (
     <>
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className="steps">
          {[1,2,3,4].map(n => (
            <div key={n} className={`step ${currentStep===n?'active':''}`}>
              {n}
            </div>
          ))}
        </div>
        <div className="label">{instructionText()}</div>
      </div>


      <div className="products-list">
        <aside className="facets">
          <h3>Filter by Size</h3>
          {allSizes.map(sz => (
            <label key={sz}>
              <input
                type="checkbox"
                checked={filters.sizes.includes(sz)}
                onChange={() => toggleFacet('sizes', sz)}
              /> {sz}
            </label>
          ))}

          <h3>Filter by Color</h3>
          {allColors.map(cl => (
            <label key={cl}>
              <input
                type="checkbox"
                checked={filters.colors.includes(cl)}
                onChange={() => toggleFacet('colors', cl)}
              /> {cl}
            </label>
          ))}
        </aside>

        <main className="grid">
          {filteredCatalog.map(item => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>${item.price}</p>

              <button onClick={() => toggleConfigurator(item.id)}>
                {openConfiguratorId === item.id ? 'Close' : 'Add to Cart'}
              </button>

              {openConfiguratorId === item.id && (
                <div className="dropdown">
                  <div className="dropdown-row">
                    <label>Size:</label>
                   <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
                     <option value="" disabled>Pick your size</option>
                     {item.availableSizes.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                   </select>
                  </div>
                  <div className="dropdown-row">
                    <label>Color:</label>
                   <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
                     <option value="" disabled>Pick your color</option>
                     {item.availableColors.map(cl => <option key={cl} value={cl}>{cl}</option>)}
                   </select>
                  </div>
                  <button className="btn-confirm" onClick={() => confirmAdd(item)} disabled={selectedSize === '' || selectedColor === ''}>
                    Confirm
                  </button>
                  <button className="btn-cancel" onClick={() => toggleConfigurator(item.id)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </>
  );
}
