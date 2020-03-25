var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends"));var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));var _classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));var _createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass"));var _possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));var _getPrototypeOf3=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));var _inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits"));var React=_interopRequireWildcard(require("react"));var _reactNative=require("react-native");var _reactNativeReanimated=_interopRequireDefault(require("react-native-reanimated"));var _TabBarItem=_interopRequireDefault(require("./TabBarItem"));var _TabBarIndicator=_interopRequireDefault(require("./TabBarIndicator"));var _memoize=_interopRequireDefault(require("./memoize"));var _jsxFileName="D:\\environment\\react-native-tab-view\\src\\TabBar.tsx";function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){(0,_defineProperty2.default)(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var TabBar=function(_React$Component){(0,_inherits2.default)(TabBar,_React$Component);function TabBar(){var _getPrototypeOf2;var _this;(0,_classCallCheck2.default)(this,TabBar);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=(0,_possibleConstructorReturn2.default)(this,(_getPrototypeOf2=(0,_getPrototypeOf3.default)(TabBar)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.state={layout:{width:0,height:0},tabWidths:{}};_this.measuredTabWidths={};_this.scrollAmount=new _reactNativeReanimated.default.Value(0);_this.getFlattenedTabWidth=function(style){var tabStyle=_reactNative.StyleSheet.flatten(style);return tabStyle?tabStyle.width:undefined;};_this.getComputedTabWidth=function(index,layout,routes,scrollEnabled,tabWidths,flattenedWidth){if(flattenedWidth==='auto'){return tabWidths[routes[index].key]||0;}switch(typeof flattenedWidth){case'number':return flattenedWidth;case'string':if(flattenedWidth.endsWith('%')){var width=parseFloat(flattenedWidth);if(Number.isFinite(width)){return layout.width*(width/100);}}}if(scrollEnabled){return layout.width/5*2;}return layout.width/routes.length;};_this.getMemoizedTabWidthGettter=(0,_memoize.default)(function(layout,routes,scrollEnabled,tabWidths,flattenedWidth){return function(i){return _this.getComputedTabWidth(i,layout,routes,scrollEnabled,tabWidths,flattenedWidth);};});_this.getMaxScrollDistance=function(tabBarWidth,layoutWidth){return tabBarWidth-layoutWidth;};_this.getTabBarWidth=function(props,state){var layout=state.layout,tabWidths=state.tabWidths;var scrollEnabled=props.scrollEnabled,tabStyle=props.tabStyle;var routes=props.navigationState.routes;return routes.reduce(function(acc,_,i){return acc+_this.getComputedTabWidth(i,layout,routes,scrollEnabled,tabWidths,_this.getFlattenedTabWidth(tabStyle));},0);};_this.normalizeScrollValue=function(props,state,value){var layout=state.layout;var tabBarWidth=_this.getTabBarWidth(props,state);var maxDistance=_this.getMaxScrollDistance(tabBarWidth,layout.width);var scrollValue=Math.max(Math.min(value,maxDistance),0);if(_reactNative.Platform.OS==='android'&&_reactNative.I18nManager.isRTL){return maxDistance-scrollValue;}return scrollValue;};_this.getScrollAmount=function(props,state,index){var layout=state.layout,tabWidths=state.tabWidths;var scrollEnabled=props.scrollEnabled,tabStyle=props.tabStyle;var routes=props.navigationState.routes;var centerDistance=Array.from({length:index+1}).reduce(function(total,_,i){var tabWidth=_this.getComputedTabWidth(i,layout,routes,scrollEnabled,tabWidths,_this.getFlattenedTabWidth(tabStyle));return total+(index===i?tabWidth/2:tabWidth);},0);var scrollAmount=centerDistance-layout.width/2;return _this.normalizeScrollValue(props,state,scrollAmount);};_this.resetScroll=function(index){if(_this.props.scrollEnabled){_this.scrollView&&_this.scrollView.scrollTo({x:_this.getScrollAmount(_this.props,_this.state,index),animated:true});}};_this.handleLayout=function(e){var _e$nativeEvent$layout=e.nativeEvent.layout,height=_e$nativeEvent$layout.height,width=_e$nativeEvent$layout.width;if(_this.state.layout.width===width&&_this.state.layout.height===height){return;}requestAnimationFrame(function(){return requestAnimationFrame(function(){return _this.setState({layout:{height:height,width:width}});});});};_this.getTranslateX=(0,_memoize.default)(function(scrollAmount,maxScrollDistance){return _reactNativeReanimated.default.multiply(_reactNative.Platform.OS==='android'&&_reactNative.I18nManager.isRTL?_reactNativeReanimated.default.sub(maxScrollDistance,scrollAmount):scrollAmount,_reactNative.I18nManager.isRTL?1:-1);});return _this;}(0,_createClass2.default)(TabBar,[{key:"componentDidUpdate",value:function componentDidUpdate(prevProps,prevState){var navigationState=this.props.navigationState;var _this$state=this.state,layout=_this$state.layout,tabWidths=_this$state.tabWidths;if(prevProps.navigationState.routes.length!==navigationState.routes.length||prevProps.navigationState.index!==navigationState.index||prevState.layout.width!==layout.width||prevState.tabWidths!==tabWidths){if(this.getFlattenedTabWidth(this.props.tabStyle)==='auto'&&!(layout.width&&navigationState.routes.every(function(r){return typeof tabWidths[r.key]==='number';}))){return;}this.resetScroll(navigationState.index);}}},{key:"render",value:function render(){var _this2=this;var _this$props=this.props,position=_this$props.position,navigationState=_this$props.navigationState,jumpTo=_this$props.jumpTo,scrollEnabled=_this$props.scrollEnabled,bounces=_this$props.bounces,getAccessibilityLabel=_this$props.getAccessibilityLabel,getAccessible=_this$props.getAccessible,getLabelText=_this$props.getLabelText,getTestID=_this$props.getTestID,renderBadge=_this$props.renderBadge,renderIcon=_this$props.renderIcon,renderLabel=_this$props.renderLabel,activeColor=_this$props.activeColor,inactiveColor=_this$props.inactiveColor,pressColor=_this$props.pressColor,pressOpacity=_this$props.pressOpacity,onTabPress=_this$props.onTabPress,onTabLongPress=_this$props.onTabLongPress,tabStyle=_this$props.tabStyle,labelStyle=_this$props.labelStyle,indicatorStyle=_this$props.indicatorStyle,contentContainerStyle=_this$props.contentContainerStyle,style=_this$props.style,indicatorContainerStyle=_this$props.indicatorContainerStyle;var _this$state2=this.state,layout=_this$state2.layout,tabWidths=_this$state2.tabWidths;var routes=navigationState.routes;var isWidthDynamic=this.getFlattenedTabWidth(tabStyle)==='auto';var tabBarWidth=this.getTabBarWidth(this.props,this.state);var tabBarWidthPercent=routes.length*40+"%";var translateX=this.getTranslateX(this.scrollAmount,this.getMaxScrollDistance(tabBarWidth,layout.width));return React.createElement(_reactNativeReanimated.default.View,{onLayout:this.handleLayout,style:[styles.tabBar,style],__source:{fileName:_jsxFileName,lineNumber:338}},React.createElement(_reactNativeReanimated.default.View,{pointerEvents:"none",style:[styles.indicatorContainer,scrollEnabled?{transform:[{translateX:translateX}]}:null,tabBarWidth?{width:tabBarWidth}:scrollEnabled?{width:tabBarWidthPercent}:null,indicatorContainerStyle],__source:{fileName:_jsxFileName,lineNumber:342}},this.props.renderIndicator({position:position,layout:layout,navigationState:navigationState,jumpTo:jumpTo,width:isWidthDynamic?'auto':100/routes.length+"%",style:indicatorStyle,getTabWidth:this.getMemoizedTabWidthGettter(layout,routes,scrollEnabled,tabWidths,this.getFlattenedTabWidth(tabStyle))})),React.createElement(_reactNative.View,{style:styles.scroll,__source:{fileName:_jsxFileName,lineNumber:371}},React.createElement(_reactNativeReanimated.default.ScrollView,{horizontal:true,accessibilityRole:"tablist",keyboardShouldPersistTaps:"handled",scrollEnabled:scrollEnabled,bounces:bounces,alwaysBounceHorizontal:false,scrollsToTop:false,showsHorizontalScrollIndicator:false,automaticallyAdjustContentInsets:false,overScrollMode:"never",contentContainerStyle:[styles.tabContent,scrollEnabled?{width:tabBarWidth||tabBarWidthPercent}:styles.container,contentContainerStyle],scrollEventThrottle:16,onScroll:_reactNativeReanimated.default.event([{nativeEvent:{contentOffset:{x:this.scrollAmount}}}]),ref:function ref(el){_this2.scrollView=el==null?void 0:el.getNode();},__source:{fileName:_jsxFileName,lineNumber:372}},routes.map(function(route){return React.createElement(_TabBarItem.default,{onLayout:isWidthDynamic?function(e){_this2.measuredTabWidths[route.key]=e.nativeEvent.layout.width;if(routes.every(function(r){return typeof _this2.measuredTabWidths[r.key]==='number';})){_this2.setState({tabWidths:_objectSpread({},_this2.measuredTabWidths)});}}:undefined,key:route.key,position:position,route:route,navigationState:navigationState,getAccessibilityLabel:getAccessibilityLabel,getAccessible:getAccessible,getLabelText:getLabelText,getTestID:getTestID,renderBadge:renderBadge,renderIcon:renderIcon,renderLabel:renderLabel,activeColor:activeColor,inactiveColor:inactiveColor,pressColor:pressColor,pressOpacity:pressOpacity,onPress:function onPress(){var event={route:route,defaultPrevented:false,preventDefault:function preventDefault(){event.defaultPrevented=true;}};onTabPress==null?void 0:onTabPress(event);if(event.defaultPrevented){return;}_this2.props.jumpTo(route.key);},onLongPress:function onLongPress(){return onTabLongPress==null?void 0:onTabLongPress({route:route});},labelStyle:labelStyle,style:tabStyle,__source:{fileName:_jsxFileName,lineNumber:404}});}))));}}]);return TabBar;}(React.Component);exports.default=TabBar;TabBar.defaultProps={getLabelText:function getLabelText(_ref){var route=_ref.route;return typeof route.title==='string'?route.title.toUpperCase():route.title;},getAccessible:function getAccessible(_ref2){var route=_ref2.route;return typeof route.accessible!=='undefined'?route.accessible:true;},getAccessibilityLabel:function getAccessibilityLabel(_ref3){var route=_ref3.route;return typeof route.accessibilityLabel==='string'?route.accessibilityLabel:typeof route.title==='string'?route.title:undefined;},getTestID:function getTestID(_ref4){var route=_ref4.route;return route.testID;},renderIndicator:function renderIndicator(props){return React.createElement(_TabBarIndicator.default,(0,_extends2.default)({},props,{__source:{fileName:_jsxFileName,lineNumber:84}}));}};var styles=_reactNative.StyleSheet.create({container:{flex:1},scroll:{overflow:'scroll'},tabBar:{backgroundColor:'#2196f3',elevation:4,shadowColor:'black',shadowOpacity:0.1,shadowRadius:_reactNative.StyleSheet.hairlineWidth,shadowOffset:{height:_reactNative.StyleSheet.hairlineWidth,width:0},zIndex:1},tabContent:{flexDirection:'row',flexWrap:'nowrap'},indicatorContainer:{position:'absolute',top:0,left:0,right:0,bottom:0}});
//# sourceMappingURL=TabBar.js.map