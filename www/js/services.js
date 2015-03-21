angular.module('starter.services', ['ngResource'])

.factory('QuranService', function ($resource) {
  return $resource('http://api.globalquran.com/surah/:surahId/quran-wordbyword');
});