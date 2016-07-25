!function(){var e,n,t;!function(i){function o(e,n){return w.call(e,n)}function r(e,n){var t,i,o,r,l,c,s,a,u,f,d,h=n&&n.split("/"),p=_.map,g=p&&p["*"]||{};if(e&&"."===e.charAt(0))if(n){for(e=e.split("/"),l=e.length-1,_.nodeIdCompat&&O.test(e[l])&&(e[l]=e[l].replace(O,"")),e=h.slice(0,h.length-1).concat(e),u=0;u<e.length;u+=1)if(d=e[u],"."===d)e.splice(u,1),u-=1;else if(".."===d){if(1===u&&(".."===e[2]||".."===e[0]))break;u>0&&(e.splice(u-1,2),u-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((h||g)&&p){for(t=e.split("/"),u=t.length;u>0;u-=1){if(i=t.slice(0,u).join("/"),h)for(f=h.length;f>0;f-=1)if(o=p[h.slice(0,f).join("/")],o&&(o=o[i])){r=o,c=u;break}if(r)break;!s&&g&&g[i]&&(s=g[i],a=u)}!r&&s&&(r=s,c=a),r&&(t.splice(0,c,r),e=t.join("/"))}return e}function l(e,n){return function(){var t=b.call(arguments,0);return"string"!=typeof t[0]&&1===t.length&&t.push(null),h.apply(i,t.concat([e,n]))}}function c(e){return function(n){return r(n,e)}}function s(e){return function(n){m[e]=n}}function a(e){if(o(v,e)){var n=v[e];delete v[e],y[e]=!0,d.apply(i,n)}if(!o(m,e)&&!o(y,e))throw new Error("No "+e);return m[e]}function u(e){var n,t=e?e.indexOf("!"):-1;return t>-1&&(n=e.substring(0,t),e=e.substring(t+1,e.length)),[n,e]}function f(e){return function(){return _&&_.config&&_.config[e]||{}}}var d,h,p,g,m={},v={},_={},y={},w=Object.prototype.hasOwnProperty,b=[].slice,O=/\.js$/;p=function(e,n){var t,i=u(e),o=i[0];return e=i[1],o&&(o=r(o,n),t=a(o)),o?e=t&&t.normalize?t.normalize(e,c(n)):r(e,n):(e=r(e,n),i=u(e),o=i[0],e=i[1],o&&(t=a(o))),{f:o?o+"!"+e:e,n:e,pr:o,p:t}},g={require:function(e){return l(e)},exports:function(e){var n=m[e];return"undefined"!=typeof n?n:m[e]={}},module:function(e){return{id:e,uri:"",exports:m[e],config:f(e)}}},d=function(e,n,t,r){var c,u,f,d,h,_,w=[],b=typeof t;if(r=r||e,"undefined"===b||"function"===b){for(n=!n.length&&t.length?["require","exports","module"]:n,h=0;h<n.length;h+=1)if(d=p(n[h],r),u=d.f,"require"===u)w[h]=g.require(e);else if("exports"===u)w[h]=g.exports(e),_=!0;else if("module"===u)c=w[h]=g.module(e);else if(o(m,u)||o(v,u)||o(y,u))w[h]=a(u);else{if(!d.p)throw new Error(e+" missing "+u);d.p.load(d.n,l(r,!0),s(u),{}),w[h]=m[u]}f=t?t.apply(m[e],w):void 0,e&&(c&&c.exports!==i&&c.exports!==m[e]?m[e]=c.exports:f===i&&_||(m[e]=f))}else e&&(m[e]=t)},e=n=h=function(e,n,t,o,r){if("string"==typeof e)return g[e]?g[e](n):a(p(e,n).f);if(!e.splice){if(_=e,_.deps&&h(_.deps,_.callback),!n)return;n.splice?(e=n,n=t,t=null):e=i}return n=n||function(){},"function"==typeof t&&(t=o,o=r),o?d(i,e,n,t):setTimeout(function(){d(i,e,n,t)},4),h},h.config=function(e){return h(e)},e._defined=m,t=function(e,n,t){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");n.splice||(t=n,n=[]),o(m,e)||o(v,e)||(v[e]=[e,n,t])},t.amd={jQuery:!0}}(),t("../lib/almond",function(){}),t("models/whenModel",[],function(){var e=Backbone.Model.extend({initialize:function(e,n){var t=i.channel("form-"+n.condition.collection.formModel.get("id")).request("get:fieldByKey",this.get("key"));t.on("change:value",this.updateCompare,this),this.listenTo(i.channel("field-"+t.get("id")),"keyup:field",this.maybeUpdateCompare),this.updateCompare(t),t.on("change:visible",this.updateCompare,this)},maybeUpdateCompare:function(e,n,t){var i=jQuery(e).val();this.updateCompare(n,null,i)},updateCompare:function(e,n,t){_.isEmpty(t)&&(t=e.get("value"));var i=this.compareValues[this.get("comparator")](t,this.get("value"));this.set("status",i),e.get("visible")||this.set("status",!1)},compareValues:{equal:function(e,n){return e==n},notequal:function(e,n){return e!=n},contains:function(e,n){return n.indexOf('"')>=0?(n=n.replace(/['"]+/g,""),new RegExp("\\b"+n+"\\b").test(e)):e.toLowerCase().indexOf(n.toLowerCase())>=0},greater:function(e,n){return parseFloat(e)>parseFloat(n)},less:function(e,n){return parseFloat(e)<parseFloat(n)}}});return e}),t("models/whenCollection",["models/whenModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){}});return n}),t("models/conditionModel",["models/whenCollection"],function(e){var n=Backbone.Model.extend({initialize:function(n){this.set("when",new e(this.get("when"),{condition:this})),this.get("when").on("change:status",this.checkWhen,this),this.checkWhen()},checkWhen:function(){var e=this.get("when").pluck("status"),n=this.get("when").pluck("connector"),t=_.every(_.values(n),function(e){return"AND"==e},this);if(t)var o=_.every(_.values(e),function(e){return e},this);else var o=_.some(_.values(e),function(e){return e},this);if(o)var r="pass";else var r="fail";_.each(this.get("then"),function(e,n){i.channel("nf_cl_"+e.trigger).request(r,this,e)},this)}});return n}),t("models/conditionCollection",["models/conditionModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.formModel=n.formModel}});return n}),t("controllers/initCollection",["models/conditionCollection"],function(e){var n=Marionette.Object.extend({initialize:function(n){new e(nfCLFrontEnd[n.get("id")],{formModel:n})}});return n}),t("controllers/showHide",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("nf_cl_hide_field").reply("pass",this.hideField,this),i.channel("nf_cl_hide_field").reply("fail",this.showField,this),i.channel("nf_cl_show_field").reply("pass",this.showField,this),i.channel("nf_cl_show_field").reply("fail",this.hideField,this)},hideField:function(e,n){var t=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",n.key);t.set("visible",!1),t.trigger("change:value",t),i.channel("fields").request("remove:error",t.get("id"),"required-error")},showField:function(e,n){var t=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",n.key);t.set("visible",!0),t.trigger("change:value",t)}});return e}),t("controllers/addRemoveOptions",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("nf_cl_add_option").reply("pass",this.addOption,this),i.channel("nf_cl_add_option").reply("fail",this.removeOption,this),i.channel("nf_cl_remove_option").reply("pass",this.removeOption,this),i.channel("nf_cl_remove_option").reply("fail",this.addOption,this)},addOption:function(e,n){var t=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",n.key),o=t.get("options");o.push(n.option),t.set("options",o),t.trigger("reRender",t)},removeOption:function(e,n){var t=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",n.key),o=t.get("options");o=_.without(o,_.findWhere(o,n.option)),t.set("options",o),t.trigger("reRender",!0)}});return e}),t("controllers/changeValue",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("nf_cl_change_value").reply("pass",this.changeValue,this)},changeValue:function(e,n){var t=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",n.key);t.set("value",n.value),t.trigger("reRender",t)}});return e}),t("controllers/selectDeselect",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("nf_cl_select_option").reply("pass",this.selectOption,this),i.channel("nf_cl_select_option").reply("fail",this.deselectOption,this),i.channel("nf_cl_deselect_option").reply("pass",this.deselectOption,this),i.channel("nf_cl_deselect_option").reply("fail",this.selectOption,this)},selectOption:function(e,n){i.channel("nf_cl_change_value").request("pass",e,n)},deselectOption:function(e,n){var t=i.channel("form-"+e.collection.formModel.get("id")).request("get:fieldByKey",n.key),o=t.get("value");o=_.difference(o,n.value),t.set("value",o),t.trigger("reRender",t)}});return e});var i=Backbone.Radio;n(["controllers/initCollection","controllers/showHide","controllers/addRemoveOptions","controllers/changeValue","controllers/selectDeselect"],function(e,n,t,o,r){var l=Marionette.Application.extend({initialize:function(e){this.listenTo(i.channel("form"),"loaded",this.initCollection)},initCollection:function(i){new n,new t,new o,new r,new e(i)},onStart:function(){}}),c=new l;c.start()}),t("main",function(){})}();
//# sourceMappingURL=almond.build.js.map
//# sourceMappingURL=front-end.js.map
