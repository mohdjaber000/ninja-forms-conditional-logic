!function(){var e,n,t;!function(i){function o(e,n){return b.call(e,n)}function l(e,n){var t,i,o,l,c,r,a,s,d,h,u,g=n&&n.split("/"),f=w.map,p=f&&f["*"]||{};if(e&&"."===e.charAt(0))if(n){for(e=e.split("/"),c=e.length-1,w.nodeIdCompat&&k.test(e[c])&&(e[c]=e[c].replace(k,"")),e=g.slice(0,g.length-1).concat(e),d=0;d<e.length;d+=1)if(u=e[d],"."===u)e.splice(d,1),d-=1;else if(".."===u){if(1===d&&(".."===e[2]||".."===e[0]))break;d>0&&(e.splice(d-1,2),d-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((g||p)&&f){for(t=e.split("/"),d=t.length;d>0;d-=1){if(i=t.slice(0,d).join("/"),g)for(h=g.length;h>0;h-=1)if(o=f[g.slice(0,h).join("/")],o&&(o=o[i])){l=o,r=d;break}if(l)break;!a&&p&&p[i]&&(a=p[i],s=d)}!l&&a&&(l=a,r=s),l&&(t.splice(0,r,l),e=t.join("/"))}return e}function c(e,n){return function(){var t=y.call(arguments,0);return"string"!=typeof t[0]&&1===t.length&&t.push(null),g.apply(i,t.concat([e,n]))}}function r(e){return function(n){return l(n,e)}}function a(e){return function(n){m[e]=n}}function s(e){if(o(v,e)){var n=v[e];delete v[e],C[e]=!0,u.apply(i,n)}if(!o(m,e)&&!o(C,e))throw new Error("No "+e);return m[e]}function d(e){var n,t=e?e.indexOf("!"):-1;return t>-1&&(n=e.substring(0,t),e=e.substring(t+1,e.length)),[n,e]}function h(e){return function(){return w&&w.config&&w.config[e]||{}}}var u,g,f,p,m={},v={},w={},C={},b=Object.prototype.hasOwnProperty,y=[].slice,k=/\.js$/;f=function(e,n){var t,i=d(e),o=i[0];return e=i[1],o&&(o=l(o,n),t=s(o)),o?e=t&&t.normalize?t.normalize(e,r(n)):l(e,n):(e=l(e,n),i=d(e),o=i[0],e=i[1],o&&(t=s(o))),{f:o?o+"!"+e:e,n:e,pr:o,p:t}},p={require:function(e){return c(e)},exports:function(e){var n=m[e];return"undefined"!=typeof n?n:m[e]={}},module:function(e){return{id:e,uri:"",exports:m[e],config:h(e)}}},u=function(e,n,t,l){var r,d,h,u,g,w,b=[],y=typeof t;if(l=l||e,"undefined"===y||"function"===y){for(n=!n.length&&t.length?["require","exports","module"]:n,g=0;g<n.length;g+=1)if(u=f(n[g],l),d=u.f,"require"===d)b[g]=p.require(e);else if("exports"===d)b[g]=p.exports(e),w=!0;else if("module"===d)r=b[g]=p.module(e);else if(o(m,d)||o(v,d)||o(C,d))b[g]=s(d);else{if(!u.p)throw new Error(e+" missing "+d);u.p.load(u.n,c(l,!0),a(d),{}),b[g]=m[d]}h=t?t.apply(m[e],b):void 0,e&&(r&&r.exports!==i&&r.exports!==m[e]?m[e]=r.exports:h===i&&w||(m[e]=h))}else e&&(m[e]=t)},e=n=g=function(e,n,t,o,l){if("string"==typeof e)return p[e]?p[e](n):s(f(e,n).f);if(!e.splice){if(w=e,w.deps&&g(w.deps,w.callback),!n)return;n.splice?(e=n,n=t,t=null):e=i}return n=n||function(){},"function"==typeof t&&(t=o,o=l),o?u(i,e,n,t):setTimeout(function(){u(i,e,n,t)},4),g},g.config=function(e){return g(e)},e._defined=m,t=function(e,n,t){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");n.splice||(t=n,n=[]),o(m,e)||o(v,e)||(v[e]=[e,n,t])},t.amd={jQuery:!0}}(),t("../lib/almond",function(){}),t("controllers/templateHelpers",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"init:model",this.addTemplateHelpers),this.listenTo(i.channel("conditions"),"init:thenModel",this.addTemplateHelpers),this.listenTo(i.channel("conditions"),"init:whenModel",this.addTemplateHelpers),this.listenTo(i.channel("conditions"),"init:elseModel",this.addTemplateHelpers)},addTemplateHelpers:function(e){e.set("renderFieldSelect",this.renderFieldSelect),e.set("renderComparators",this.renderComparators),e.set("renderTriggers",this.renderTriggers),e.set("renderWhenValue",this.renderWhenValue),e.set("renderThenValue",this.renderThenValue),e.set("renderElseValue",this.renderThenValue)},renderFieldSelect:function(e){var n=i.channel("fields").request("get:collection"),t=i.channel("settings").request("get:setting","calculations");n.sort();var o=_.template(jQuery("#nf-tmpl-field-select").html());return o({calcCollection:t,fieldCollection:n,currentValue:e})},renderComparators:function(e,n){var t={equal:{label:"Equals",value:"equal"},notequal:{label:"Does Not Equal",value:"notequal"},contains:{label:"Contains",value:"contains"},notcontains:{label:"Does Not Contain",value:"notcontains"},greater:{label:"Greater Than",value:"greater"},less:{label:"Less Than",value:"less"}};if(e){var o=i.channel("fields").request("get:field",e),l=i.channel("fields").request("get:type",o.get("type")),c=i.channel("conditions-"+o.get("type")).request("get:comparators",t);c||(c=i.channel("conditions-"+l.get("parentType")).request("get:comparators",t)||t)}else var c=t;var r=_.template(jQuery("#nf-tmpl-cl-comparators").html());return r({comparators:c,currentComparator:n})},renderTriggers:function(e,n,t){var o={show_field:{label:"Show Field",value:"show_field"},hide_field:{label:"Hide Field",value:"hide_field"},change_value:{label:"Change Value",value:"change_value"}};if(e){var l=i.channel("fields").request("get:field",e),c=i.channel("fields").request("get:type",l.get("type")),r=i.channel("conditions-"+l.get("type")).request("get:triggers",o);r||(r=i.channel("conditions-"+c.get("parentType")).request("get:triggers",o)||o)}else var r=o;var a=_.template(jQuery("#nf-tmpl-cl-triggers").html());return a({triggers:r,currentTrigger:n})},renderWhenValue:function(e,n,t){var o=_.template(jQuery("#nf-tmpl-cl-value-default").html()),l=o({value:t});if(e){var c=i.channel("fields").request("get:field",e),r=i.channel("fields").request("get:type",c.get("type")),a=i.channel("conditions-"+c.get("type")).request("get:valueInput",e,n,t);a||(a=i.channel("conditions-"+r.get("parentType")).request("get:valueInput",e,n,t)||l)}else var a=l;return a},renderThenValue:function(e,n,t){if("change_value"!=n&&"select_option"!=n&&"deselect_option"!=n&&"show_option"!=n&&"hide_option"!=n)return"";var o=_.template(jQuery("#nf-tmpl-cl-value-default").html()),l=o({value:t});if(e){var c=i.channel("fields").request("get:field",e),r=i.channel("fields").request("get:type",c.get("type")),a=i.channel("conditions-"+c.get("type")).request("get:valueInput",e,n,t);a||(a=i.channel("conditions-"+r.get("parentType")).request("get:valueInput",e,n,t)||l)}else var a=l;return a}});return e}),t("views/whenItem",[],function(){var e=Marionette.ItemView.extend({template:"#nf-tmpl-and-item",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting","click .nf-remove-and":"clickRemove"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model)},clickRemove:function(e){i.channel("conditions").trigger("click:removeWhen",e,this.model)}});return e}),t("views/firstWhenItem",[],function(){var e=Marionette.ItemView.extend({template:"#nf-tmpl-first-when-item",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model)}});return e}),t("views/whenCollection",["views/whenItem","views/firstWhenItem"],function(e,n){var t=Marionette.CollectionView.extend({getChildView:function(t){return t.collection.first()==t?n:e},initialize:function(e){this.whenDiv=e.whenDiv,this.conditionModel=e.conditionModel},attachHtml:function(e,n,t){0==t?this.whenDiv.append(n.el):this.conditionModel.get("collapsed")||(e.isBuffering?e._bufferedChildren.splice(t,0,n):e._insertBefore(n,t)||e._insertAfter(n))}});return t}),t("views/thenItem",[],function(){var e=Marionette.ItemView.extend({template:"#nf-tmpl-then-item",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting","click .nf-remove-then":"clickRemove"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model),i.channel("conditions").trigger("change:then",e,this.model)},clickRemove:function(e){i.channel("conditions").trigger("click:removeThen",e,this.model)}});return e}),t("views/thenCollection",["views/thenItem"],function(e){var n=Marionette.CollectionView.extend({childView:e,initialize:function(e){}});return n}),t("views/elseItem",[],function(){var e=Marionette.ItemView.extend({template:"#nf-tmpl-else-item",initialize:function(){this.listenTo(this.model,"change",this.render)},events:{"change .setting":"changeSetting","click .nf-remove-else":"clickRemove"},changeSetting:function(e){i.channel("conditions").trigger("change:setting",e,this.model)},clickRemove:function(e){i.channel("conditions").trigger("click:removeElse",e,this.model)}});return e}),t("views/elseCollection",["views/elseItem"],function(e){var n=Marionette.CollectionView.extend({childView:e,initialize:function(e){}});return n}),t("views/conditionItem",["views/whenCollection","views/thenCollection","views/elseCollection"],function(e,n,t){var o=Marionette.LayoutView.extend({template:"#nf-tmpl-condition",regions:{and:".nf-and-region",then:".nf-then-region","else":".nf-else-region"},initialize:function(){this.listenTo(this.model,"change:collapsed",this.render),this.listenTo(i.channel("drawer"),"closed",this.drawerClosed)},onRender:function(){var i=jQuery(this.el).find(".nf-when");this.and.show(new e({collection:this.model.get("when"),whenDiv:i,conditionModel:this.model})),this.model.get("collapsed")||(this.then.show(new n({collection:this.model.get("then")})),this["else"].show(new t({collection:this.model.get("else")})))},events:{"click .nf-remove-condition":"clickRemove","click .nf-collapse-condition":"clickCollapse","click .nf-add-and":"clickAddWhen","click .nf-add-then":"clickAddThen","click .nf-add-else":"clickAddElse"},clickRemove:function(e){i.channel("conditions").trigger("click:removeCondition",e,this.model)},clickCollapse:function(e){i.channel("conditions").trigger("click:collapseCondition",e,this.model)},clickAddWhen:function(e){i.channel("conditions").trigger("click:addWhen",e,this.model)},clickAddThen:function(e){i.channel("conditions").trigger("click:addThen",e,this.model)},clickAddElse:function(e){i.channel("conditions").trigger("click:addElse",e,this.model)}});return o}),t("views/conditionCollection",["views/conditionItem"],function(e){var n=Marionette.CollectionView.extend({childView:e,initialize:function(e){this.collection=e.dataModel.get("conditions")}});return n}),t("controllers/returnChildView",["views/conditionCollection"],function(e){var n=Marionette.Object.extend({initialize:function(){i.channel("cl_condition").reply("get:settingChildView",this.getChildView)},getChildView:function(n){return e}});return n}),t("models/whenModel",[],function(){var e=Backbone.Model.extend({defaults:{connector:"AND",key:"",comparator:"",value:""},initialize:function(){i.channel("conditions").trigger("init:whenModel",this)}});return e}),t("models/whenCollection",["models/whenModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.options=n}});return n}),t("models/thenModel",[],function(){var e=Backbone.Model.extend({defaults:{key:"",trigger:"",value:""},initialize:function(){i.channel("conditions").trigger("init:thenModel",this)}});return e}),t("models/thenCollection",["models/thenModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.options=n}});return n}),t("models/elseModel",[],function(){var e=Backbone.Model.extend({defaults:{key:"",trigger:"",value:""},initialize:function(){i.channel("conditions").trigger("init:elseModel",this)}});return e}),t("models/elseCollection",["models/elseModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.options=n}});return n}),t("models/conditionModel",["models/whenCollection","models/thenCollection","models/elseCollection"],function(e,n,t){var o=Backbone.Model.extend({defaults:{collapsed:!1},initialize:function(){this.set("when",new e(this.get("when"),{conditionModel:this})),this.set("then",new n(this.get("then"),{conditionModel:this})),this.set("else",new t(this.get("else"),{conditionModel:this})),i.channel("conditions").trigger("init:model",this)}});return o}),t("models/conditionCollection",["models/conditionModel"],function(e){var n=Backbone.Collection.extend({model:e,initialize:function(e,n){this.options=n}});return n}),t("views/drawerHeader",[],function(){var e=Marionette.ItemView.extend({template:"#nf-tmpl-drawer-header",events:{"click .nf-add-new":"clickAddNew"},clickAddNew:function(e){i.channel("conditions").trigger("click:addNew",e)}});return e}),t("controllers/newCondition",["models/whenCollection","models/whenModel"],function(e,n){var t=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"click:addNew",this.addNew)},addNew:function(e){var n=i.channel("settings").request("get:setting","conditions"),t=n.add({when:[{}],then:[{}],"else":[]}),o={object:"Condition",label:"Condition",change:"Added",dashicon:"plus-alt"},l={collection:n};i.channel("changes").request("register:change","addCondition",t,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")}});return t}),t("controllers/updateSettings",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"change:setting",this.updateSetting)},updateSetting:function(e,n){var t=jQuery(e.target).val(),o=jQuery(e.target).data("id"),l=n.get(o);n.set(o,t);var c=t,r={attr:o,before:l,after:c},a={conditionModel:n.collection.options.conditionModel},s={object:"Condition",label:"Condition",change:"Changed "+o+" from "+l+" to "+c};i.channel("changes").request("register:change","changeSetting",n,r,s,a),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")}});return e}),t("controllers/clickControls",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"click:removeCondition",this.removeCondition),this.listenTo(i.channel("conditions"),"click:collapseCondition",this.collapseCondition),this.listenTo(i.channel("conditions"),"click:removeWhen",this.removeWhen),this.listenTo(i.channel("conditions"),"click:removeThen",this.removeThen),this.listenTo(i.channel("conditions"),"click:removeElse",this.removeElse),this.listenTo(i.channel("conditions"),"click:addWhen",this.addWhen),this.listenTo(i.channel("conditions"),"click:addThen",this.addThen),this.listenTo(i.channel("conditions"),"click:addElse",this.addElse)},removeCondition:function(e,n){var t=n.collection;n.collection.remove(n);var o={object:"Condition",label:"Condition",change:"Removed",dashicon:"dismiss"},l={collection:t};i.channel("changes").request("register:change","removeCondition",n,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},collapseCondition:function(e,n){n.set("collapsed",!n.get("collapsed")),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},removeWhen:function(e,n){var t=n.collection;this.removeItem(n);var o={object:"Condition - When",label:"Condition - When",change:"Removed",dashicon:"dismiss"},l={collection:t};i.channel("changes").request("register:change","removeWhen",n,null,o,l)},removeThen:function(e,n){var t=n.collection;this.removeItem(n);var o={object:"Condition - Then",label:"Condition - Then",change:"Removed",dashicon:"dismiss"},l={collection:t};i.channel("changes").request("register:change","removeThen",n,null,o,l)},removeElse:function(e,n){var t=n.collection;this.removeItem(n);var o={object:"Condition - Else",label:"Condition - Else",change:"Removed",dashicon:"dismiss"},l={collection:t};i.channel("changes").request("register:change","removeElse",n,null,o,l)},removeItem:function(e){e.collection.remove(e),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},addWhen:function(e,n){var t=n.get("when").add({}),o={object:"Condition - When Criteron",label:"Condition - When Criteron",change:"Added",dashicon:"plus-alt"},l={conditionModel:n};i.channel("changes").request("register:change","addWhen",t,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},addThen:function(e,n){var t=n.get("then").add({}),o={object:"Condition - Do Item",label:"Condition - Do Item",change:"Added",dashicon:"plus-alt"},l={conditionModel:n};i.channel("changes").request("register:change","addThen",t,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")},addElse:function(e,n){var t=n.get("else").add({}),o={object:"Condition - Else Item",label:"Condition - Else Item",change:"Added",dashicon:"plus-alt"},l={conditionModel:n};i.channel("changes").request("register:change","addElse",t,null,o,l),i.channel("app").request("update:setting","clean",!1),i.channel("app").request("update:db")}});return e}),t("controllers/undo",["views/conditionCollection"],function(e){var n=Marionette.Object.extend({initialize:function(){i.channel("changes").reply("undo:addCondition",this.undoAddCondition,this),i.channel("changes").reply("undo:removeCondition",this.undoRemoveCondition,this),i.channel("changes").reply("undo:addWhen",this.undoAddWhen,this),i.channel("changes").reply("undo:addThen",this.undoAddThen,this),i.channel("changes").reply("undo:addElse",this.undoAddElse,this),i.channel("changes").reply("undo:removeWhen",this.undoRemoveWhen,this),i.channel("changes").reply("undo:removeThen",this.undoRemoveThen,this),i.channel("changes").reply("undo:removeElse",this.undoRemoveElse,this)},undoAddCondition:function(e,n){var t=e.get("model"),o=e.get("data");o.collection.remove(t);var l=i.channel("changes").request("get:collection"),c=l.where(function(e){return(e=t)||"undefined"!=typeof e.get("data").conditionModel&&e.get("data").conditionModel==t?!0:!1});_.each(c,function(e){l.remove(e)}),this.maybeRemoveChange(e,n)},undoRemoveCondition:function(e,n){var t=e.get("model"),i=e.get("data");i.collection.add(t),this.maybeRemoveChange(e,n)},undoAddWhen:function(e,n){var t=e.get("model"),i=e.get("data");i.conditionModel.get("when").remove(t),this.maybeRemoveChange(e,n)},undoAddThen:function(e,n){var t=e.get("model"),i=e.get("data");i.conditionModel.get("then").remove(t),this.maybeRemoveChange(e,n)},undoAddElse:function(e,n){var t=e.get("model"),i=e.get("data");i.conditionModel.get("else").remove(t),this.maybeRemoveChange(e,n)},undoRemoveWhen:function(e,n){var t=e.get("model"),i=e.get("data");i.collection.add(t),this.maybeRemoveChange(e,n)},undoRemoveThen:function(e,n){var t=e.get("model"),i=e.get("data");i.collection.add(t),this.maybeRemoveChange(e,n)},undoRemoveElse:function(e,n){var t=e.get("model"),i=e.get("data");i.collection.add(t),this.maybeRemoveChange(e,n)},maybeRemoveChange:function(e,n){var n="undefined"!=typeof n?n:!1;if(!n){i.channel("app").request("update:db");var t=i.channel("changes").request("get:collection");t.remove(e),0==t.length&&(i.channel("app").request("update:setting","clean",!0),i.channel("app").request("close:drawer"))}}});return n}),t("controllers/maybeModifyElse",["views/conditionCollection"],function(e){var n=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"change:then",this.maybeAddElse)},maybeAddElse:function(e,n){var t=!1,i=jQuery(e.target).val();switch(i){case"show_field":t="hide_field";break;case"hide_field":t="show_field";break;case"show_option":break;case"hide_option":}if(t){var o=n.collection.options.conditionModel;"undefined"==typeof o.get("else").findWhere({key:n.get("key"),trigger:t})&&o.get("else").add({key:n.get("key"),trigger:t})}}});return n}),t("controllers/coreValues",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("conditions-checkbox").reply("get:valueInput",this.getCheckboxValue),i.channel("conditions-list").reply("get:valueInput",this.getListValue)},getCheckboxValue:function(e,n,t){var i=_.template(jQuery("#nf-tmpl-cl-value-checkbox").html());return i({value:t})},getListValue:function(e,n,t){var o=i.channel("fields").request("get:field",e),l=o.get("options"),c=_.template(jQuery("#nf-tmpl-cl-value-list").html());return c({options:l,value:t})}});return e}),t("controllers/coreComparators",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("conditions-checkbox").reply("get:comparators",this.getCheckboxComparators),i.channel("conditions-list").reply("get:comparators",this.getListComparators)},getCheckboxComparators:function(e){return{is:{label:"Is",value:"equal"},isnot:{label:"Is Not",value:"notequal"}}},getListComparators:function(e){return{has:{label:"Has Selected",value:"contains"},hasnot:{label:"Does Not Have Selected",value:"notcontains"}}}});return e}),t("controllers/coreTriggers",[],function(){var e=Marionette.Object.extend({initialize:function(){i.channel("conditions-list").reply("get:triggers",this.getListTriggers),i.channel("conditions-submit").reply("get:triggers",this.getSubmitTriggers)},getListTriggers:function(e){var n=_.extend(e,{select_option:{label:"Select Option",value:"select_option"},deselect_option:{label:"De-Select Option",value:"deselect_option"},show_option:{label:"Show Option",value:"show_option"},hide_option:{label:"Hide Option",value:"hide_option"}}),n=_.omit(e,"change_value");return n},getSubmitTriggers:function(e){return _.omit(e,"change_value")}});return e}),t("controllers/getDrawerHeader",["views/drawerHeader"],function(e){var n=Marionette.Object.extend({initialize:function(){i.channel("conditional_logic").reply("get:drawerHeaderView",this.getDrawerHeaderView,this)},getDrawerHeaderView:function(){return e}});return n}),t("controllers/trackKeyChanges",[],function(){var e=Marionette.Object.extend({initialize:function(){this.listenTo(i.channel("conditions"),"init:whenModel",this.registerKeyChangeTracker),this.listenTo(i.channel("conditions"),"init:thenModel",this.registerKeyChangeTracker),this.listenTo(i.channel("conditions"),"init:elseModel",this.registerKeyChangeTracker)},registerKeyChangeTracker:function(e){e.listenTo(i.channel("app"),"replace:fieldKey",this.updateKey,e)},updateKey:function(e,n,t){var i=n._previousAttributes.key,o=n.get("key");this.get("key")==i&&this.set("key",o)}});return e}),t("controllers/loadControllers",["controllers/templateHelpers","controllers/returnChildView","models/conditionCollection","views/drawerHeader","controllers/newCondition","controllers/updateSettings","controllers/clickControls","controllers/undo","controllers/maybeModifyElse","controllers/coreValues","controllers/coreComparators","controllers/coreTriggers","controllers/getDrawerHeader","controllers/trackKeyChanges"],function(e,n,t,i,o,l,c,r,a,s,d,h,u,g){var f=Marionette.Object.extend({initialize:function(){new e,new n,new o,new l,new c,new r,new a,new s,new d,new h,new u,new g}});return f});var i=Backbone.Radio;n(["controllers/loadControllers","models/conditionCollection"],function(e,n){var t=Marionette.Application.extend({initialize:function(e){this.listenTo(i.channel("app"),"after:appStart",this.afterNFLoad)},onStart:function(){new e},afterNFLoad:function(e){var t=i.channel("settings").request("get:setting","conditions");!1==t instanceof Backbone.Collection&&(t=new n(t),i.channel("settings").request("update:setting","conditions",t,!0))}}),o=new t;o.start()}),t("main",function(){})}();
//# sourceMappingURL=almond.build.js.map
//# sourceMappingURL=builder.js.map
