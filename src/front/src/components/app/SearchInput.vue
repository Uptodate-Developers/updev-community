<template>
<form method="GET">
    <div class="relative text-gray-400 focus-within:text-gray-400">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <svg  stroke="currentColor"   stroke-linecap="round" stroke-linejoin="round" fill="none"  viewBox="0 0 24 24" class="w-6 h-6 stroke-2 text-gray-400 stroke-gray-400"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
      <input  type="search" name="q" class="py-2 text-sm text-white bg-gray-100 rounded-sm pl-10 focus:outline-none border border-gray-200 focus:border-gray-200  focus:bg-white focus:text-gray-900 lg:w-96 focus:border-0 focus:ring-offset-blue-500" placeholder="Rechercher..." autocomplete="off">
    </div>
  </form>
</template>