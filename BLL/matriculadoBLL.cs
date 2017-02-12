using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using entidades;

namespace BLL
{
    public class matriculadoBLL
    {
        public List<entidades.matriculado> getMatriculados()
        {
            using (var ctx = new registrospublicosEntities() )
            {
                List<DAL.matriculado> lMatr = ctx.Set<DAL.matriculado>().ToList();
                List<entidades.matriculado> lMatEntidad = new List<entidades.matriculado>();
                foreach (DAL.matriculado m in lMatr) {
                    entidades.matriculado ma = new entidades.matriculado();
                    ma.direccion = m.direccion;
                    ma.estado = m.estado;
                    ma.id = m.id;
                    ma.noMatricula = m.noMatricula;
                    ma.propietario = m.propietario;
                    ma.razonSocial_nombre = m.razonSocial_nombre;
                    ma.telefono = m.telefono;
                    ma.ubicacion = new entidades.ubicacion();
                    ma.ubicacion.id = m.ubicacions.First().id;
                    ma.ubicacion.matriculado_id = m.ubicacions.First().matriculado_id;
                    ma.ubicacion.latitud = m.ubicacions.First().latitud;
                    ma.ubicacion.longitud = m.ubicacions.First().longitud;

                    lMatEntidad.Add(ma);                   
                }
                return lMatEntidad;
            }
        }

        public respuesta guardarMatriculado(entidades.matriculado matriculado)
        {
            entidades.respuesta resp = new respuesta();
            try
            {
                using (var ctx = new registrospublicosEntities())
                {
                    DAL.matriculado ma = new DAL.matriculado();
                    ma.direccion = matriculado.direccion;
                    ma.estado = matriculado.estado;
                    ma.id = matriculado.id;
                    ma.noMatricula = matriculado.noMatricula;
                    ma.propietario = matriculado.propietario;
                    ma.razonSocial_nombre = matriculado.razonSocial_nombre;
                    ma.telefono = matriculado.telefono;
                    ctx.matriculadoes.Add(ma);

                    ma.ubicacions = new List<DAL.ubicacion>();
                    DAL.ubicacion ubi = new DAL.ubicacion();
                    ubi.latitud = matriculado.ubicacion.latitud;
                    ubi.longitud = matriculado.ubicacion.longitud;
                    ma.ubicacions.Add(ubi);
                    ctx.SaveChanges();

                    resp.bandera = true;
                    resp.mensaje = "Matriculado guardado";
                    return resp;

                }
            } catch(Exception exc)
            {
                resp.bandera = false;
                resp.mensaje = exc.Message;
                return resp;

            }
        }

        public respuesta actualizarMatriculado(int id, entidades.matriculado matriculado)
        {
            entidades.respuesta resp = new respuesta();
            try
            {
                using (var ctx = new registrospublicosEntities())
                {
                    DAL.matriculado ma = ctx.matriculadoes.Where(t=>t.id==id).First();
                    if (ma != null)
                    {
                        ma.direccion = matriculado.direccion;
                        ma.estado = matriculado.estado;
                        ma.noMatricula = matriculado.noMatricula;
                        ma.propietario = matriculado.propietario;
                        ma.razonSocial_nombre = matriculado.razonSocial_nombre;
                        ma.telefono = matriculado.telefono;

                        ma.ubicacions.First().latitud = matriculado.ubicacion.latitud;
                        ma.ubicacions.First().longitud = matriculado.ubicacion.longitud;
                        ctx.SaveChanges();

                        resp.bandera = true;
                        resp.mensaje = "Matriculado actualizado";

                    }
                    else
                    {
                        resp.bandera = false;
                        resp.mensaje = "No se encontro matriculado";
                    }

                    return resp;

                }
            }
            catch (Exception exc)
            {
                resp.bandera = false;
                resp.mensaje = exc.Message;
                return resp;

            }
        }

        public respuesta eliminarMatriculado(int id)
        {
            entidades.respuesta resp = new respuesta();
            try
            {
                using (var ctx = new registrospublicosEntities())
                {
                    DAL.matriculado ma = ctx.matriculadoes.Where(t => t.id == id).First();
                    if (ma != null)
                    {
                        ctx.matriculadoes.Remove(ma);
                        ctx.SaveChanges();

                        resp.bandera = true;
                        resp.mensaje = "Matriculado eliminado";
                    } else
                    {
                        resp.bandera = false;
                        resp.mensaje = "No se encontro matriculado";
                    }

                    return resp;

                }
            }
            catch (Exception exc)
            {
                resp.bandera = false;
                resp.mensaje = exc.Message;
                return resp;

            }
        }

    }
}
