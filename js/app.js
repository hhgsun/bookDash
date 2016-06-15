var app = angular.module('toDoApp', ["firebase"]);
app.controller('ToDoController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {

  $scope.sortType = 'name'; // set the default sort type
  $scope.sortReverse = false;  // set the default sort order
  $scope.searchFish = '';     // set the default search/filter term



	var ref = new Firebase("https://project-1354059080109407925.firebaseio.com/takipler");
	$scope.tasks = $firebaseArray(ref);

	$scope.editIndex = false;
	$scope.addTask = function () {
		if ($scope.kitap.adSoyad && $scope.kitap.kitapAdi) {
			var tarih = new Date().toString();
			console.log(tarih);
			$scope.tasks.$add({ adSoyad: $scope.kitap.adSoyad, kitapAdi: $scope.kitap.kitapAdi, aciklama: $scope.kitap.aciklama, eklemeTarih: tarih });
			$scope.kitap.adSoyad = null;
			$scope.kitap.kitapAdi = null;
			$scope.kitap.aciklama = null;
		} else {
			console.log("Lütfen AdSoyad ve Kitap adı giriniz.")
		}
	}

	$scope.editOpen = function (index) {
		if ($scope.editTodo == index) {
			$scope.editTodo = false;
		} else {
			$scope.editTodo = index;
		}
	}

	$scope.editSave = function (todo) {
		ref.child(todo.$id).set({ adSoyad: todo.adSoyad, kitapAdi: todo.kitapAdi, aciklama: todo.aciklama });
		$scope.editOpen();
	}

	$scope.doneTask = function (index) {
		$scope.tasks[index].done = true;
	}
	$scope.unDoneTask = function (index) {
		$scope.tasks[index].done = false;
	}
	$scope.deleteTask = function (id) {
		var conf = confirm("Silmek İstediğinize eminmisiniz.");
		if (conf) {
			console.log(id);
			var silinecekKisi = ref.child(id);
			silinecekKisi.remove(onComplete);
			var onComplete = function (error) {
				if (error) {
					console.log('Silme İşleminde Hata');
				} else {
					console.log('Silme işlemi başarılı');
				}
			};
			$scope.tasks.splice(id, -1);
		}
	}


}])