var mhsManager = angular.module('mhsManager', []);

function mainController($scope, $http) {
    $scope.formData = {};


    $http.get('/mhs/')
        .success(function(data) {
            $scope.mhs = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $scope.createMhs = function() {
        $http.post('/mhs/', $scope.formData)
            .success(function(data) {
                     $scope.formData = {}; 
   
  $http.get('/mhs/')
   .success(function(data) {
    $scope.mhs = data;
    console.log(data);
   })
   .error(function(data) {
    console.log('Error: ' + data);
   });
    
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
    $scope.deleteMhs = function(id) {
        $http.delete('/mhs/' + id)
            .success(function(data) {    
  $http.get('/mhs/')
   .success(function(data) {
    $scope.mhs = data;
    console.log(data);
   })
   .error(function(data) {
    console.log('Error: ' + data);
   });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    
    $scope.updateMhs = function() {
        $http.put('/mhs/' + $scope.formDataUpdate.id, $scope.formDataUpdate)
            .success(function(data) {
                $scope.formDataUpdate = {}; 
    
  $http.get('/mhs/')
   .success(function(data) {
    $scope.mhs = data;
    console.log(data);
   })
   .error(function(data) {
    console.log('Error: ' + data);
   });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}