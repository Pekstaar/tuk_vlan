import React from "react";

const LoadingList = () => {
  return (
    <div class="rounded-md p-2 max-w-sm w-full mx-auto">
      <div class="animate-pulse flex space-x-2">
        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        <div class="flex-1 space-y-3 py-1">
          <div class="h-8 bg-slate-200 rounded"></div>
          {/* <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
              <div class="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-2 bg-slate-200 rounded"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoadingList;
