import { filterOptions } from "../../config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

function ProductFilter({ filters, handleFilter }) {
  const getSelectedCount = (category) => {
    if (!filters || !filters[category]) return 0;
    return filters[category].length;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-black">
      <div className="p-6 border-b border-black">
        <h2 className="text-xl font-bold text-black flex items-center gap-2">
          <span>Filters</span>
          {Object.keys(filterOptions).some(category => getSelectedCount(category) > 0) && (
            <Badge className="bg-black text-white text-xs border border-black">
              {Object.keys(filterOptions).reduce((total, category) => total + getSelectedCount(category), 0)} active
            </Badge>
          )}
        </h2>
      </div>
      <div className="p-6 space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-black capitalize">
                  {keyItem}
                </h3>
                {getSelectedCount(keyItem) > 0 && (
                  <Badge variant="secondary" className="bg-gray-100 text-black border border-black text-xs">
                    {getSelectedCount(keyItem)} selected
                  </Badge>
                )}
              </div>
              <div className="space-y-3">
                {Array.isArray(filterOptions[keyItem]) && filterOptions[keyItem].map((option) => {
                  const isChecked = filters &&
                    Object.keys(filters).length > 0 &&
                    filters[keyItem] &&
                    filters[keyItem].indexOf(option.id) > -1;
                  
                  return (
                    <Label 
                      key={option.id} 
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                        isChecked ? 'bg-gray-100 border border-black' : 'bg-transparent border border-transparent'
                      }`}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => handleFilter(keyItem, option.id)}
                        className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <span className={`font-medium transition-colors duration-200 ${
                        isChecked ? 'text-black' : 'text-black'
                      }`}>
                        {option.label}
                      </span>
                    </Label>
                  );
                })}
              </div>
            </div>
            <Separator className="bg-black" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;