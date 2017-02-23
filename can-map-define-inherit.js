steal('can/map', function(can) {
	var assign = function (d, s) {
		for (var prop in s) {
			d[prop] = s[prop];
		}
		return d;
	};
	
	var twoLevelDeepExtend = function (destination, source) {
		for (var prop in source) {
			destination[prop] = destination[prop] || {};
			assign(destination[prop], source[prop]);
		}
	};

	var oldMapSetup = can.Map.setup;	
	can.Map.setup = function(baseMap) {
		var baseDefine = baseMap.prototype.define;
		if ( baseDefine ) {
			var definitions = this.prototype.define = this.prototype.define || {};			
			var defines = {};
			
			twoLevelDeepExtend(defines, baseDefine);
			twoLevelDeepExtend(defines, definitions);
			can.extend(definitions, defines);
		}
		
		oldMapSetup.apply(this, arguments);
	};
});