using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace entidades
{
    public class matriculado
    {
        public int id { get; set; }
        public string noMatricula { get; set; }
        public string razonSocial_nombre { get; set; }
        public string propietario { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public string estado { get; set; }

        public ubicacion ubicacion { get; set; }

    }
}
