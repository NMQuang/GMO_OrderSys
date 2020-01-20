import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:rxdart/rxdart.dart';

import './bloc.dart';
import '../../../models/index.dart';
import '../../../providers/index.dart';
import '../../../repositories/indext.dart';

class MenuDetailBloc extends Bloc<MenuDetailEvent, MenuDetailState> {
  MenuRepository _menuRepository = new MenuRepository(new MenuProvider());
  OrderRepository _orderRepository = new OrderRepository(new OrderProvider());

  List<ItemList> _items = [];
  Order _order;
  User _user;
  Menu _menu;

  BehaviorSubject<List<ItemList>> _subjectItems = BehaviorSubject();

  BehaviorSubject<Order> _subjectOrder = BehaviorSubject();

  Stream<List<ItemList>> get items => _subjectItems.stream;

  Stream<Order> get order => _subjectOrder.stream;

  @override
  MenuDetailState get initialState => InitialMenuDetail([]);

  @override
  Stream<MenuDetailState> mapEventToState(
    MenuDetailEvent event,
  ) async* {
    // Mapping handle function follow event
    if (event is InitData) yield* mapInitDataEvent(event);
    if (event is UpdateState) yield* mapUpdateStateEvent(event);
    if (event is GetMenuDetail) yield* mapGetMenuDetailEvent(event);
    if (event is SelectProduct) yield* mapSelectProductEvent(event);
    if (event is SubmitOrder) yield* mapSubmitOrderEvent(event);
  }

  /// Handle event [SelectProduct]
  /// Called when product is selected
  Stream<MenuDetailState> mapSelectProductEvent(
    SelectProduct event,
  ) async* {
    // Loop and set selected for list
    _items.forEach(
        (item) => item.selected = (item.product.id == event.productId));

    _subjectItems.add(_items);
  }

  /// Handle event [GetMenuDetail]
  /// Called when product is selected
  Stream<MenuDetailState> mapGetMenuDetailEvent(
    GetMenuDetail event,
  ) async* {
    //  Change state to loading
    yield (LoadingMenuDetail(_items));

    //  Call API get menu detail
    getMenuDetail();
    getOrderDetail();
  }

  /// Handle event [UpdateState]
  /// Called when update state
  Stream<MenuDetailState> mapUpdateStateEvent(
    UpdateState event,
  ) async* {
    yield event.menuDetailState;
  }

  /// Handle event [InitData]
  /// Called when Init data
  Stream<MenuDetailState> mapInitDataEvent(
    InitData event,
  ) async* {
    _user = event.user;
    _menu = event.menu;
  }

  /// Handle event [SubmitOrder]
  /// Called when submit form
  Stream<MenuDetailState> mapSubmitOrderEvent(
    SubmitOrder event,
  ) async* {
    // yield LoadingMenuDetail(_items);
    ItemList item = _items.firstWhere((item) => item.selected, orElse: null);

    if (item != null) {
      if (_order == null) {
        _createOrder(item);
      } else {
        _updateOrder(item);
      }
    } else {
      // yield LoadedMenuDetail([]);
    }
  }

  _updateOrder(ItemList item) {
    _orderRepository
        .updateOrder(
      token: _user.accessToken,
      productId: item.product.id,
      menuId: _menu.id,
      orderId: _order.id,
    )
        .listen(
      (onData) {
        // print(onData);

        _transformOrder(item.product);
      },
      onError: (error) {},
      onDone: () {},
    );
  }

  _createOrder(ItemList item) {
    _orderRepository
        .createOrder(
      token: _user.accessToken,
      userId: _user.id,
      menuId: _menu.id,
      productId: item.product.id,
    )
        .listen(
      (onData) {
        _transformOrder(null);
      },
      onError: (erroe) {},
      onDone: () {},
    );
  }

  _transformOrder(Product product) {
    _items.add(ItemList(product: _order.product, selected: false));

    _order.product = product;

    ItemList item = _items.firstWhere(
      (item) => item.product.id == _order.product.id,
      orElse: () => null,
    );

    if (item != null) {
      _items.remove(item);
    }

    _subjectOrder.add(_order);
    _subjectItems.add(_items);

    dispatch(UpdateState(menuDetailState: LoadedMenuDetail(_items)));
  }

  transformItemList() {
    if (_order != null) {
      ItemList item = _items.firstWhere(
        (item) => _order.product.id == item.product.id,
        orElse: () => null,
      );

      if (item != null) {
        _items.remove(item);
        _subjectItems.add(_items);
      }
    }

    _subjectOrder.add(_order);
    _subjectItems.add(_items);
  }

  void getMenuDetail() {
    var subject = _menuRepository.getMenuDetail(
      menuId: _menu.id,
      token: _user.accessToken,
    );

    // Listen data
    subject.listen((products) {
      if (products != null) {
        _items = products
            .map((product) => ItemList(product: product, selected: false))
            .toList();

        // _subjectItems.add(_items);

        dispatch(UpdateState(menuDetailState: LoadedMenuDetail(_items)));
      }
    });

    // Handle on error
    subject.handleError((error) {
      dispatch(UpdateState(menuDetailState: LoadedMenuDetail(_items)));
    });

    subject.onCancel = () {
      transformItemList();
    };
  }

  void getOrderDetail() {
    var subject = _orderRepository.getOrder(
      token: _user.accessToken,
      menuId: _menu.id,
      userId: _user.id,
    );

    // Hanlde data
    subject.listen((order) {
      if (order != null) {
        _order = order;
        // _subjectOrder.add(order);
      }
    });

    // Hanlde on error
    subject.handleError((error) {
      print(error);
    });

    subject.onCancel = () {
      transformItemList();
    };
  }

  @override
  void dispose() {
    super.dispose();
    _subjectItems.close();
    _subjectOrder.close();
  }
}
