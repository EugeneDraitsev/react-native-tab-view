import _classCallCheck from"@babel/runtime/helpers/classCallCheck";import _createClass from"@babel/runtime/helpers/createClass";import _possibleConstructorReturn from"@babel/runtime/helpers/possibleConstructorReturn";import _getPrototypeOf from"@babel/runtime/helpers/getPrototypeOf";import _inherits from"@babel/runtime/helpers/inherits";var _jsxFileName="D:\\environment\\react-native-tab-view\\src\\ScrollPager.tsx";import*as React from'react';import{StyleSheet,Keyboard,InteractionManager}from'react-native';import Animated from'react-native-reanimated';var event=Animated.event,divide=Animated.divide,Value=Animated.Value;var ScrollPager=function(_React$Component){_inherits(ScrollPager,_React$Component);function ScrollPager(){var _getPrototypeOf2;var _this;_classCallCheck(this,ScrollPager);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}_this=_possibleConstructorReturn(this,(_getPrototypeOf2=_getPrototypeOf(ScrollPager)).call.apply(_getPrototypeOf2,[this].concat(args)));_this.initialOffset={x:_this.props.navigationState.index*_this.props.layout.width,y:0};_this.interactionHandle=null;_this.scrollViewRef=React.createRef();_this.jumpTo=function(key){var _this$props=_this.props,navigationState=_this$props.navigationState,keyboardDismissMode=_this$props.keyboardDismissMode,onIndexChange=_this$props.onIndexChange;var index=navigationState.routes.findIndex(function(route){return route.key===key;});if(navigationState.index===index){_this.scrollTo(index*_this.props.layout.width);}else{onIndexChange(index);if(keyboardDismissMode==='auto'){Keyboard.dismiss();}}};_this.scrollTo=function(x){var animated=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;if(_this.scrollViewRef.current){_this.scrollViewRef.current.getNode().scrollTo({x:x,animated:animated});}};_this.enterListeners=[];_this.addListener=function(type,listener){switch(type){case'enter':_this.enterListeners.push(listener);break;}};_this.removeListener=function(type,listener){switch(type){case'enter':{var index=_this.enterListeners.indexOf(listener);if(index>-1){_this.enterListeners.splice(index,1);}break;}}};_this.position=new Animated.Value(_this.props.navigationState.index*_this.props.layout.width);_this.onScroll=event([{nativeEvent:{contentOffset:{x:_this.position}}}]);_this.layoutWidthNode=new Value(_this.props.layout.width);_this.relativePosition=divide(_this.position,_this.layoutWidthNode);return _this;}_createClass(ScrollPager,[{key:"componentDidMount",value:function componentDidMount(){if(this.props.layout.width){this.scrollTo(this.props.navigationState.index*this.props.layout.width,false);}}},{key:"componentDidUpdate",value:function componentDidUpdate(prevProps){var offset=this.props.navigationState.index*this.props.layout.width;if(prevProps.navigationState.routes.length!==this.props.navigationState.routes.length||prevProps.layout.width!==this.props.layout.width){this.scrollTo(offset,false);}else if(prevProps.navigationState.index!==this.props.navigationState.index){this.scrollTo(offset);}if(prevProps.layout.width!==this.props.layout.width){this.layoutWidthNode.setValue(this.props.layout.width);}}},{key:"componentWillUnmount",value:function componentWillUnmount(){if(this.interactionHandle!==null){InteractionManager.clearInteractionHandle(this.interactionHandle);}}},{key:"render",value:function render(){var _this2=this;var _this$props2=this.props,children=_this$props2.children,layout=_this$props2.layout,onSwipeStart=_this$props2.onSwipeStart,onSwipeEnd=_this$props2.onSwipeEnd,overscroll=_this$props2.overscroll,navigationState=_this$props2.navigationState;var handleSwipeStart=function handleSwipeStart(){onSwipeStart==null?void 0:onSwipeStart();_this2.interactionHandle=InteractionManager.createInteractionHandle();};var handleSwipeEnd=function handleSwipeEnd(){onSwipeEnd==null?void 0:onSwipeEnd();if(_this2.interactionHandle!==null){InteractionManager.clearInteractionHandle(_this2.interactionHandle);}};return children({position:this.relativePosition,addListener:this.addListener,removeListener:this.removeListener,jumpTo:this.jumpTo,render:function render(children){return React.createElement(Animated.ScrollView,{pagingEnabled:true,directionalLockEnabled:true,keyboardDismissMode:"on-drag",keyboardShouldPersistTaps:"always",overScrollMode:"never",scrollToOverflowEnabled:true,scrollEnabled:_this2.props.swipeEnabled,automaticallyAdjustContentInsets:false,bounces:overscroll,scrollsToTop:false,showsHorizontalScrollIndicator:false,scrollEventThrottle:1,onScroll:_this2.onScroll,onScrollBeginDrag:handleSwipeStart,onScrollEndDrag:handleSwipeEnd,onMomentumScrollEnd:_this2.onScroll,contentOffset:_this2.initialOffset,style:styles.container,contentContainerStyle:layout.width?{flexDirection:'row',width:layout.width*navigationState.routes.length,flex:1}:null,ref:_this2.scrollViewRef,__source:{fileName:_jsxFileName,lineNumber:160}},children);}});}}]);return ScrollPager;}(React.Component);ScrollPager.defaultProps={bounces:true};export{ScrollPager as default};var styles=StyleSheet.create({container:{flex:1}});
//# sourceMappingURL=ScrollPager.js.map