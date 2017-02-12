app.service("matriculadoService", function ($http) {  
  

    this.getAll2 = function () {
        var req = $http.get(uri+'/Matriculado');
        return req;
    };

    this.postMatriculado = function (matriculado) {
        var req = $http.post(uri + '/Matriculado', matriculado); 
        return req;
    };

    this.put = function (id, matriculado) {       
        var req = $http.put(uri + '/Matriculado/' + id, matriculado);
        return req;        
    };

    this.delete = function (id) {
        var req = $http.delete(uri + '/Matriculado/' + id);
        return req;
    };
    
});