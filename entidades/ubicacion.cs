using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace entidades
{
    public class ubicacion
    {
        public int id { get; set; }
        public Nullable<int> matriculado_id { get; set; }
        public string latitud { get; set; }
        public string longitud { get; set; }
    }
}
