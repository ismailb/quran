angular.module('starter.services', ['ngResource', 'starter.utils'])
	.factory('QuranService', function($resource, $q, $http, LocalStorage) {
		return {
			getSurah: function(surahNumber) {
				console.log(surahNumber);
				var quranUrl = 'http://api.globalquran.com/surah/'+surahNumber+'/quran-wordbyword';
				var defer = $q.defer();
				$http({
					method: 'GET',
					url: quranUrl
				}).success(function(response) {
					console.log(response);
					var surahObj = response.quran['quran-wordbyword'];
					var surah = [];
					$.each(surahObj, function(key, value) {
						var fullVerse = value.verse;
						var words = [];
						var ayah = {};
						$.each(fullVerse.split('$'), function(idx, verse) {
							if (verse) {
								var word = {};
								var wordByLang = verse.split('|');
								word["ar"] = wordByLang[0];
								word["en"] = wordByLang[1];
								var knownWord = LocalStorage.get(wordByLang[0]);
								if (knownWord) {
									word["className"] = "item item-balanced";
								} else {
									word["className"] = "item item-light";
								}
								words.push(word);
							}
						});
						ayah.number = key;
						ayah.words = words;
						surah.push(ayah); //[value.ayah] 
					});
					defer.resolve(surah);
				});
				return defer.promise;
			}
		}
	});