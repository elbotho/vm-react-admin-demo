import {
  stringify
} from 'query-string';
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  GET_MANY,
  GET_MANY_REFERENCE,
} from 'react-admin';

const apiUrl = '//api.ofdb.io/v0';

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */


export default (type, resource, params) => {

  const url = `${apiUrl}/${resource}/`;

  const options = {
    headers: new Headers({
      Accept: 'application/json',
    }),
    cache: "force-cache"
  };

  return fetch(url, options)
    .then(res => {
      return res.json();
    })
    .then(json => {
      let data = json
      if( params.filter.title ) data = data.filter(title => title.indexOf(params.filter.title) !== -1 )
      
      if( params.sort.field === 'title' ) data.sort()
      let indexReverseHelper = 0;
      if( params.sort.order === 'ASC' ){
        data.reverse()
        indexReverseHelper = data.length
      } 
      
      data = data.slice( (params.pagination.page-1)*params.pagination.perPage , params.pagination.page*params.pagination.perPage )
                 .map( (val, index) => { return({ id:"["+Math.abs(index-indexReverseHelper)+"]", title:val}) } )
      
      return {
        data: data,
        total: json.length
      }
    });

};

//borrowed, should also be done on api I guess
var by = function (path, reverse, primer, then) {
  var get = function (obj, path) {
          if (path) {
              path = path.split('.');
              for (var i = 0, len = path.length - 1; i < len; i++) {
                  obj = obj[path[i]];
              };
              return obj[path[len]];
          }
          return obj;
      },
      prime = function (obj) {
          return primer ? primer(get(obj, path)) : get(obj, path);
      };
  
  return function (a, b) {
      var A = prime(a),
          B = prime(b);
      
      return (
          (A < B) ? -1 :
          (A > B) ?  1 :
          (typeof then === 'function') ? then(a, b) : 0
      ) * [1,-1][+!!reverse];
  };
};
